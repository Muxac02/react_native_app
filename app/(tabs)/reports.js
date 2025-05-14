import { StyleSheet, Text, SafeAreaView } from "react-native";
import ReportCardContent from "@/components/ReportCardContent";
import { compatibilityFlags } from "react-native-screens";

export default function Reports() {
  const reports = [
    {
      number: 1,
      author: "Иван Иванов",
      updated_at: null,
      created_at: "2025-04-27T18:16:19.067068",
      content: [
        {
          number: 1,
          type: "table",
          name: "records",
          isGroup: false,
          ships: ['СУАЛ "Сибирь"'],
          dateFrom: "2025-01-1",
          dateTo: "2025-04-10",
          content: [
            {
              number: 1,
              port: "МУР",
              arrive_date: "2025-03-01T10:00:00.000000",
              sail_date: "2025-03-01T10:00:00.000000",
              arrive_date_real: "2025-03-01T10:00:00.000000",
              sail_date_real: "2025-03-01T10:00:00.000000",
              comment:
                "График от 14.02.2025 График от 14.02.2025 График от 14.02.2025",
            },
            {
              number: 2,
              port: "МУР",
              arrive_date: "2025-03-01T10:00:00.000000",
              sail_date: "2025-03-01T10:00:00.000000",
              arrive_date_real: "2025-03-01T10:00:00.000000",
              sail_date_real: "2025-03-01T10:00:00.000000",
              comment:
                "График от 14.02.2025 График от 14.02.2025 График от 14.02.2025",
            },
          ],
        },
        {
          number: 2,
          type: "table",
          name: "records",
          isGroup: true,
          ships: ['СУАЛ "Сибирь"', 'ГУАЛ "Арктика"'],
          dateFrom: "2025-01-1",
          dateTo: "2025-04-10",
          content: [
            {
              number: 1,
              ship: 'СУАЛ "Сибирь"',
              port: "МУР",
              arrive_date: "2025-03-01T10:00:00.000000",
              sail_date: "2025-03-01T10:00:00.000000",
              arrive_date_real: "2025-03-01T10:00:00.000000",
              sail_date_real: "2025-03-01T10:00:00.000000",
              comment:
                "График от 14.02.2025 График от 14.02.2025 График от 14.02.2025",
            },
            {
              number: 2,
              ship: 'СУАЛ "Сибирь"',
              port: "МУР",
              arrive_date: "2025-03-01T10:00:00.000000",
              sail_date: "2025-03-01T10:00:00.000000",
              arrive_date_real: "2025-03-01T10:00:00.000000",
              sail_date_real: "2025-03-01T10:00:00.000000",
              comment:
                "График от 14.02.2025 График от 14.02.2025 График от 14.02.2025",
            },
            {
              number: 3,
              ship: 'ГУАЛ "Арктика"',
              port: "МУР",
              arrive_date: "2025-03-01T10:00:00.000000",
              sail_date: "2025-03-01T10:00:00.000000",
              arrive_date_real: "2025-03-01T10:00:00.000000",
              sail_date_real: "2025-03-01T10:00:00.000000",
              comment:
                "График от 14.02.2025 График от 14.02.2025 График от 14.02.2025",
            },
            {
              number: 4,
              ship: 'ГУАЛ "Арктика"',
              port: "МУР",
              arrive_date: "2025-03-01T10:00:00.000000",
              sail_date: "2025-03-01T10:00:00.000000",
              arrive_date_real: "2025-03-01T10:00:00.000000",
              sail_date_real: "2025-03-01T10:00:00.000000",
              comment:
                "График от 14.02.2025 График от 14.02.2025 График от 14.02.2025",
            },
          ],
        },
      ],
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      {reports.map((report) => {
        return (
          <ReportCardContent
            data={report}
            key={`report_card_content${report.number}`}
          />
        );
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "rgba(127, 127, 127, 0.4)",
    paddingTop: 8,
    paddingHorizontal: 12,
  },
});
