import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { ReportsContext } from "../../../_layout";
import ReportCardBlock from "../../../../components/ReportCardBlock";

export default function Report() {
  const { id } = useLocalSearchParams();
  const reports = useContext(ReportsContext);
  const data = reports.find((report) => report.number == id);
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
      <View style={styles.buttonGroup}>
        <TouchableHighlight
          onPress={() => {
            console.log("1 pressed");
          }}
          style={styles.button}
          underlayColor="#6CACE4"
        >
          <Text style={styles.buttonText}>Сохранить</Text>
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
        <TouchableHighlight
          onPress={() => {
            console.log("3 pressed");
          }}
          style={styles.button}
          underlayColor="#6CACE4"
        >
          <Text style={styles.buttonText}>Отправить</Text>
        </TouchableHighlight>
      </View>
      <View>
        {data.content.map((block) => {
          return (
            <View style={styles.block}>
              <ReportCardBlock
                data={block}
                key={`reportScreen${data.number}BlockConent${block.number}`}
                cardNumber={data.number}
              />
            </View>
          );
        })}
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
