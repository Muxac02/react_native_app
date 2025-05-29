import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import RecordCard from "../../components/RecordCard";
import { useRecords } from "@/contexts/RecordsContext";

export default function App() {
  const { records, loading, error } = useRecords();
  const RecordsCardList = (records) => {
    return records.map((record) => {
      return <RecordCard data={record} key={record.number} />;
    });
  };
  const br = "\n";
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.recordsList}>
        {loading && <ActivityIndicator size="large" />}
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
