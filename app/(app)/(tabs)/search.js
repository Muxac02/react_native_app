import RecordCard from "@/components/RecordCard";
import { useRecords } from "@/contexts/RecordsContext";
import { useSearchRecords } from "@/contexts/SearchRecordsContext";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";

export default function Search() {
  const { recordsSearch, loadingSearch, errorSearch } = useSearchRecords();
  const { records, changeStatus } = useRecords();
  if (loadingSearch)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.recordsList}>
        {records.map((record) => {
          if (recordsSearch.includes(record.number))
            return (
              <RecordCard
                data={record}
                changeStatus={changeStatus}
                key={record.number}
              >
                {record.number}
              </RecordCard>
            );
        })}
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
