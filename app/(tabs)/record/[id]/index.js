import { StyleSheet, Text, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function RecordCard() {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.container}>
      <Text>Record {id}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
