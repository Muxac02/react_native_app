import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Icon } from "./ui/icon";
import { usePathname } from "expo-router";
import {
  Sheet,
  ChartPie,
  ChartColumnBig,
  ChartColumnStacked,
} from "lucide-react-native";
import ReportCardBlockTable from "./ReportCardBlockTable";
import { useSelect } from "@/contexts/SelectContext";

export default function ReportCardBlock(props) {
  const { ships } = useSelect();
  const currentScreen = usePathname().split("/")[1];
  const data = props.data;
  const loading = props.loading == undefined ? false : props.loading;
  let icon = "";
  switch (data.type) {
    case "table":
      icon = Sheet;
      break;
    case "pie":
      icon = ChartPie;
      break;
    case "barDefault":
      icon = ChartColumnBig;
      break;
    case "barGrouped":
      icon = ChartColumnStacked;
      break;
  }
  let name = "";
  switch (data.name) {
    case "records":
      name = "Записи за промежуток";
      break;
    case "points":
      name = "Статистика прохождения КТ";
      break;
    case "travel":
      name = "Статистика времени следования";
      break;
    case "port":
      name = "Статистика времени нахождения в порту";
      break;
  }
  return (
    <View style={currentScreen == "report" ? null : styles.container}>
      <View style={styles.head}>
        <Icon as={icon} size="" />
        <Text style={styles.blockName}>{name}</Text>
      </View>
      {currentScreen == "reports" ? (
        data.isGroup ? (
          <View>
            <Text style={styles.blockGrouppedText}>Групповая</Text>
            <Text style={styles.blockShips}>Суда:</Text>
            {data.ships.map((ship) => {
              return (
                <Text
                  key={`ship${ship}InListOfBlock${data.number}OfCard${
                    props.cardNumber
                      ? props.cardNumber
                      : "InReportCreationScreen"
                  }${
                    currentScreen == "report"
                      ? "ReportScreen"
                      : "ReportsListScreen"
                  }`}
                  style={[{ marginLeft: 6 }, styles.blockShips]}
                >
                  {`\u2022 ${ships.find((s) => s.number == ship).name}`}
                </Text>
              );
            })}
          </View>
        ) : (
          <View>
            <Text style={styles.blockShips}>Судно:</Text>
            <Text style={styles.blockShips}>
              {ships.find((s) => s.number == data.ships[0]).name}
            </Text>
          </View>
        )
      ) : null}
      <Text style={styles.blockDates}>
        {new Date(data.dateFrom).getTime() == 0
          ? "Без ограничения"
          : new Date(data.dateFrom).toLocaleDateString()}
        {" --- "}
        {new Date(data.dateTo).getTime() == 0
          ? "Без ограничения"
          : new Date(data.dateTo).toLocaleDateString()}
      </Text>
      {currentScreen == "report" ? (
        loading ? (
          <ActivityIndicator />
        ) : (
          <View
            style={{
              borderTopWidth: 2,
              paddingTop: 4,
              borderColor: "rgba(127, 127, 127, 0.4)",
              width: "100%",
              height:
                data.content.length > 0
                  ? data.name == "records"
                    ? 50 + data.content.length * 20
                    : data.name == "points"
                    ? 50 + data.content.length * 20
                    : data.name == "travel"
                    ? 90 + data.content.length * 20
                    : data.name == "port"
                    ? 60 + data.content.length * 20
                    : 120
                  : 25,
            }}
          >
            {data.content.length && data.type == "table" ? (
              <ReportCardBlockTable
                data={data}
                blockNumber={data.number}
                cardNumber={props.cardNumber}
              />
            ) : null}
            {data.content.length <= 0 && (
              <Text>Информация о записях отсутствует</Text>
            )}
          </View>
        )
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "rgba(127, 127, 127, 0.4)",
    borderRadius: 8,
    padding: 2,
    marginTop: 4,
  },
  head: { flexDirection: "row" },
  blockName: {
    fontSize: 16,
  },
  blockGrouppedText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  blockShips: {
    fontSize: 14,
    fontWeight: "medium",
  },
  blockDates: {
    fontSize: 14,
    fontWeight: "medium",
  },
});
