import { router } from "expo-router";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function SignIn() {
  const { login, error, user, loadingInit } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);
  };
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "admin":
          router.replace("/admin");
          break;
        case "department_worker":
          router.replace("/reports");
          break;
        case "dispatcher":
          router.replace("/");
          break;
      }
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/logo.png")}
        style={{ width: "95%", height: 250, bottom: 48, objectFit: "contain" }}
      />
      <Text style={styles.upperText}>Логин</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="Логин"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.upperText}>Пароль</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="Пароль"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      {error ? (
        <Text style={{ color: "rgb(197, 0, 0)" }}>Ошибка : {error.detail}</Text>
      ) : null}
      {loading || loadingInit ? <ActivityIndicator /> : null}
      <TouchableHighlight
        underlayColor="#6CACE4"
        style={[
          styles.button,
          {
            backgroundColor:
              loading || loadingInit ? "#666" : "rgb(2, 94, 161)",
          },
        ]}
        onPress={handleLogin}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: loading || loadingInit ? "#000" : "#fff",
          }}
        >
          Войти
        </Text>
      </TouchableHighlight>
      {/* <Text
        onPress={() => {
          login("muxac01", "123");
          router.replace("/");
        }}
      >
        Sign In
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderRadius: 12,
    width: "80%",
    height: 40,
    margin: 8,
    marginTop: 4,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    padding: 12,
    minWidth: "40%",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 12,
    marginHorizontal: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(2, 94, 161)",
  },
  upperText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
