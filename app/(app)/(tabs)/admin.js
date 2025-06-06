import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Text,
} from "react-native";

export default function Admin() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>admin panel</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  recordsList: {
    flex: 1,
    backgroundColor: "rgba(127, 127, 127, 0.4)",
  },
  errorText: {
    fontSize: 18,
    margin: 16,
    color: "rgb(63, 0, 0)",
  },
});
