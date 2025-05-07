import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import RecordCard from "../../components/RecordCard";

export default function App() {
  const records = [
    {
      arrive_date: "2025-04-27T18:20:00",
      port: "МУР",
      sail_date: "2025-05-04T18:20:00",
      sail_date_real: "2025-04-27T18:35:53.966429",
      updated_at: null,
      number: 1,
      ship: 'а\\л "Таймыр"',
      created_at: "2025-04-27T18:16:19.067068",
      arrive_date_real: "2025-04-27T18:35:49.998517",
      comment: "string",
    },
    {
      arrive_date: "2025-04-27T18:30:00",
      port: "СПб",
      sail_date: "2025-05-04T18:30:00",
      sail_date_real: null,
      updated_at: null,
      number: 2,
      ship: 'СУАЛ "Урал"',
      created_at: "2025-04-27T18:33:11.545150",
      arrive_date_real: null,
      comment: "string",
    },
  ];
  const RecordsCardList = (records) => {
    return records.map((record) => {
      return <RecordCard data={record} key={record.number} />;
    });
  };
  const br = "\n";
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.recordsList}>
        {RecordsCardList(records)}
      </ScrollView>
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
});
