import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "@/utils/apiurl";

// Создаём контекст
const AuthContext = createContext();

// Конфиг API
const TOKEN_KEY = "auth_token";

// Создаём провайдер
export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null, // null - проверка, false - не авторизован, true - авторизован
    user: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Инициализация - проверяем есть ли токен при загрузке
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Проверяем валидность токена
          try {
            const userResponse = await axios.get(
              `${API_URL}/users/current/get`
            );
            setAuthState({
              token,
              authenticated: true,
              user: userResponse.data,
            });
          } catch (error) {
            // Токен невалидный - удаляем
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            setAuthState({
              token: null,
              authenticated: false,
              user: null,
            });
          }
        } else {
          setAuthState({
            token: null,
            authenticated: false,
            user: null,
          });
        }
      } catch (error) {
        console.error("Failed to load token", error);
        setAuthState({
          token: null,
          authenticated: false,
          user: null,
        });
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  // Функция входа
  const login = async (username, password) => {
    try {
      // 1. Получаем токен
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const tokenResponse = await axios.post(
        `${API_URL}/users/token`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const token = tokenResponse.data.access_token;
      // 2. Сохраняем токен
      await SecureStore.setItemAsync(TOKEN_KEY, token);

      // 3. Настраиваем axios для последующих запросов
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // 4. Получаем данные пользователя
      const userResponse = await axios.get(`${API_URL}/users/current/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setAuthState({
        token,
        authenticated: true,
        user: userResponse.data,
      });
      setError(null);
      return { success: true };
    } catch (error) {
      //console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data);
      return {
        success: false,
        error: error.response?.data?.detail || error.message || "Login failed",
      };
    }
  };

  // Функция выхода
  const logout = async () => {
    try {
      // Удаляем токен из SecureStore
      await SecureStore.deleteItemAsync(TOKEN_KEY);

      // Удаляем заголовок из axios
      delete axios.defaults.headers.common["Authorization"];

      // Сбрасываем состояние
      setAuthState({
        token: null,
        authenticated: false,
        user: null,
      });

      // Перенаправляем на страницу входа
      router.replace("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Функция регистрации
  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users`, {
        ...userData,
        password: userData.password, // Бэкенд сам хеширует пароль
      });

      // После успешной регистрации автоматически входим
      if (response.data) {
        return await login(userData.login, userData.password);
      }
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: error.response?.data?.detail || "Registration failed",
      };
    }
  };

  // Проверка ролей
  const hasRole = (role) => {
    return authState.user?.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        loading,
        login,
        logout,
        register,
        hasRole,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
