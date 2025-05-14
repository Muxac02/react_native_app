import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Record() {
  const { id, ...data } = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topTextContainer}>
        <Text style={styles.topText}>
          {data.created_at
            ? `Создана: ${new Date(data.created_at).toLocaleString()}`
            : "Ошибка, нету даты создания"}
        </Text>
        <Text style={styles.topText}>
          {data.updated_at
            ? `Изменена: ${new Date(data.updated_at).toLocaleString()}`
            : "Не изменялась"}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(127, 127, 127, 0.4)",
  },
  topTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  topText: {
    fontSize: 12,
  },
});
