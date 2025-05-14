import { View, Text, StyleSheet } from "react-native";
import { Icon } from "./ui/icon";
import {
  Sheet,
  ChartPie,
  ChartColumnBig,
  ChartColumnStacked,
} from "lucide-react-native";

export default function ReportCardBlock(props) {
  const data = props.data;
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
  switch (props.type) {
    case "content":
      return (
        <View style={styles.container}>
          <View style={styles.head}>
            <Icon as={icon} size="xl" />
            <Text style={styles.blockName}>{name}</Text>
          </View>
          {data.isGroup ? (
            <View>
              <Text style={styles.blockGrouppedText}>Групповая</Text>
              <Text style={styles.blockShips}>Суда:</Text>
              {data.ships.map((ship) => {
                return (
                  <Text
                    key={`ship${ship}InListOfBlock${data.number}OfCard${props.cardNumber}`}
                    style={[{ marginLeft: 6 }, styles.blockShips]}
                  >
                    {`\u2022 ${ship}`}
                  </Text>
                );
              })}
            </View>
          ) : (
            <View>
              <Text style={styles.blockShips}>Судно:</Text>
              <Text style={styles.blockShips}>{data.ships[0]}</Text>
            </View>
          )}
          <Text style={styles.blockDates}>
            {new Date(data.dateFrom).toLocaleDateString()}
            {" --- "}
            {new Date(data.dateTo).toLocaleDateString()}
          </Text>
        </View>
      );
    case "report":
      return (
        <View>
          <Text>Report2</Text>
        </View>
      );
  }
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
