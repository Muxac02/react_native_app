import { StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import ReportCardContent from "@/components/ReportCardContent";
import { useContext } from "react";
import { ReportsContext } from "../_layout";

export default function Reports() {
  const reports = useContext(ReportsContext);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
