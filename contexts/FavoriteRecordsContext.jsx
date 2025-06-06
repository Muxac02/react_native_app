import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "@/utils/apiurl";
import { useAuth } from "./AuthContext";

const FavoriteRecordsContext = createContext();

export const FavoriteRecordsProvider = ({ children }) => {
  const { user } = useAuth();
  const [recordsFavorite, setRecords] = useState([]);
  const [loadingFavorite, setLoading] = useState(false);
  const [errorFavorite, setError] = useState(null);
  useEffect(() => {
    if (user) fetchRecords(user.number);
  }, [user]);
  const fetchRecords = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/favorites/user/${id}`); // твой метод API
      if (!response.ok) {
        throw new Error(
          `Failed to fetch records, status: ${response.status}`,
          response.status
        );
      }
      const data = await response.json();
      setRecords(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (user, record) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/favorites/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
          record: record,
        }),
      }); // твой метод API
      if (!response.ok) {
        throw new Error(
          `Failed to add favorite, status: ${response.status}`,
          response.status
        );
      }
      fetchRecords(user);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteFavorite = async (user, record) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/favorites/?user=${user}&record=${record}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ); // твой метод API
      if (!response.ok) {
        throw new Error(
          `Failed to delete favorite, status: ${response.status}`,
          response.status
        );
      }
      fetchRecords(user);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FavoriteRecordsContext.Provider
      value={{
        recordsFavorite,
        loadingFavorite,
        errorFavorite,
        fetchRecords,
        addFavorite,
        deleteFavorite,
      }}
    >
      {children}
    </FavoriteRecordsContext.Provider>
  );
};

export const useFavoriteRecords = () => {
  const context = useContext(FavoriteRecordsContext);
  if (!context) {
    throw new Error(
      "useFavoriteRecords must be used within a FavoriteRecordsContext"
    );
  }
  return context;
};
