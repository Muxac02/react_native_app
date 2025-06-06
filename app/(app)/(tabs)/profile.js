import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableHighlight,
  Alert,
} from "react-native";
import TextField from "@/components/TextField";
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
  const { logout, user } = useAuth();
  const getRole = (role) => {
    switch (role) {
      case "admin":
        return "Администратор";
      case "department_worker":
        return "Работник отдела мониторинга";
      case "dispatcher":
        return "Диспетчер";
      default:
        return "Неизвестно";
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextField title={"Роль"} text={getRole(user.role)} />
      <TextField title={"Логин"} text={user.login} />
      <TextField title={"Имя"} text={user.firstname} />
      <TextField title={"Фамилия"} text={user.lastname} />
      <TouchableHighlight
        onPress={() => {
          Alert.alert(
            "Выход",
            "Вы действительно хотите выйти?",
            [
              {
                text: "Отмена",
                style: "cancel",
              },
              {
                text: "Выйти",
                onPress: () => {
                  logout();
                },
              },
            ],
            { cancelable: true }
          );
        }}
        style={styles.button}
        underlayColor={"rgb(108, 172, 228)"}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Выйти</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "rgba(127, 127, 127, 0.4)",
    padding: 48,
  },
  button: {
    padding: 4,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 12,
    marginHorizontal: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(2, 94, 161)",
  },
});
