import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import RecordCard from "../../components/RecordCard";
import { useRecords } from "@/contexts/RecordsContext";

export default function App() {
  const { records, loading, error, changeStatus, refreshRecords } =
    useRecords();
  const RecordsCardList = (records) => {
    return records.map((record) => {
      const archived = record.sail_date_real
        ? Math.abs(new Date(record.sail_date_real) - Date.now()) >=
          7 * 24 * 60 * 60 * 1000
        : false;
      if (archived) return;
      return (
        <RecordCard
          data={record}
          key={record.number}
          changeStatus={changeStatus}
          loading={loading}
        />
      );
    });
  };
  const br = "\n";
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.recordsList}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshRecords} />
        }
      >
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
