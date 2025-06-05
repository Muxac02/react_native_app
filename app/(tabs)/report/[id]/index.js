import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useReports } from "@/contexts/ReportsContext";
import ReportCardBlock from "../../../../components/ReportCardBlock";
import generateExcelFile from "@/utils/ExcelGeneration";

export default function Report() {
  const { reports, loading, error, authors } = useReports();
  const { id } = useLocalSearchParams();
  const data = reports.find((report) => report.number == id);
  const author = authors.find((author) => author.number == data.author).name;
  const handleExport = async () => {
    try {
      const result = await generateExcelFile(data.content, id);
      if (!result.success) {
        Alert.alert("Ошибка", "Не удалось создать файл");
      }
    } catch (error) {
      Alert.alert("Ошибка", error.message);
    }
  };
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={[
          styles.topText,
          { width: "100%", textAlign: "left", marginTop: 4, marginLeft: 16 },
        ]}
      >
        {author ? `Автор: ${author}` : "Ошибка, нету автора"}
      </Text>
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
      <View style={styles.buttonGroup}>
        <TouchableHighlight
          onPress={() => {
            handleExport();
          }}
          style={styles.button}
          underlayColor="#6CACE4"
        >
          <Text style={styles.buttonText}>Поделится\{"\n"}сохранить</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            console.log("2 pressed");
          }}
          style={styles.button}
          underlayColor="#6CACE4"
        >
          <Text style={styles.buttonText}>Изменить</Text>
        </TouchableHighlight>
      </View>
      <ScrollView>
        {data.content.map((block) => {
          return (
            <View
              key={`reportScreen${data.number}BlockConent${block.number}`}
              style={styles.block}
            >
              <ReportCardBlock data={block} cardNumber={data.number} />
            </View>
          );
        })}
      </ScrollView>
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
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 8,
  },
  button: {
    flex: 1,
    backgroundColor: "#025EA1",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  block: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 4,
    padding: 8,
  },
});
