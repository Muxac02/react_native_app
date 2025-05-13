import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import TextField from "@/components/TextField";

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <TextField title={"Роль"} />
      <TextField title={"Логин"} />
      <TextField title={"Имя"} />
      <TextField title={"Фамилия"} />
      <TouchableHighlight
        onPress={() => {
          console.log("logout");
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
