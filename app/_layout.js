import { Slot } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { HoldMenuProvider } from "react-native-hold-menu";
import { PaperProvider } from "react-native-paper";
import { createContext } from "react";

export const ReportsContext = createContext();

export default function Root() {
  // Set up the auth context and render our layout inside of it.
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
              ship: 'СУАЛ "Сибирь"',
              port: "МУР",
              arrive_date: "2025-03-01T10:00:00.000000",
              sail_date: "2025-03-01T10:00:00.000000",
              arrive_date_real: "2025-03-01T10:00:00.000000",
              sail_date_real: "2025-03-01T10:00:00.000000",
              comment:
                "График от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025",
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
                "График от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025",
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
                "График от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025",
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
                "График от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025",
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
                "График от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025",
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
                "График от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025",
            },
          ],
        },
      ],
    },
  ];
  return (
    <ReportsContext.Provider value={reports}>
      <GluestackUIProvider mode="light">
        <HoldMenuProvider theme="light" paddingBottom={48}>
          <PaperProvider>
            <Slot />
          </PaperProvider>
        </HoldMenuProvider>
      </GluestackUIProvider>
    </ReportsContext.Provider>
  );
}
