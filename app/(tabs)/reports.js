import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ReportCardContent from "@/components/ReportCardContent";
import { useReports } from "@/contexts/ReportsContext";

export default function Reports() {
  const { reports, loading, error } = useReports();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {loading && <ActivityIndicator />}
        {reports.map((report) => {
          return (
            <ReportCardContent
              data={report}
              key={`report_card_content${report.number}`}
            />
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
    backgroundColor: "rgba(127, 127, 127, 0.4)",
  },
});
