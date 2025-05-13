import { StyleSheet, Text, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Search() {
  const params = useLocalSearchParams();
  const data = {
    ship: params.ship,
    port: params.port,
    archived: params.archived,
    arriveDateInfo: JSON.parse(params.arriveDateInfo),
    sailDateInfo: JSON.parse(params.sailDateInfo),
  };
  console.log(data);
  return (
    <SafeAreaView style={styles.container}>
      <Text>NEED TO SEND FETCH TO API WITH PARAMS IN DATA</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
