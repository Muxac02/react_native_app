import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Text,
} from "react-native";
import ReportCardContent from "@/components/ReportCardContent";
import { useReports } from "@/contexts/ReportsContext";

export default function Reports() {
  const { reports, loading, error, authors, refreshReports } = useReports();
  const br = "\n";
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.recordsList}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refreshReports} />
          }
        >
          <Text style={styles.errorText}>
            Ошибка при загрузке данных:{br}
            {error}
            Проверьте подключение к внутренней сети предприятия
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.recordsList}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshReports} />
        }
      >
        {loading && <ActivityIndicator />}
        {reports.map((report) => {
          return (
            <ReportCardContent
              data={{
                ...report,
                author: authors.find((aut) => aut.number == report.author).name,
              }}
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
  },
  recordsList: {
    flex: 1,
    backgroundColor: "rgba(127, 127, 127, 0.4)",
  },
  errorText: {
    fontSize: 18,
    margin: 16,
    color: "rgb(63, 0, 0)",
  },
});
