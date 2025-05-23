import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { usePathname } from "expo-router";

export default function ReportCardBlockTable(props) {
  const data = props.data;
  const currentScreen = usePathname().split("/")[2];
  const CP_StatisticCell = (total, inTime, late) => {
    return (
      <View
        style={{
          width: 160,
          height: "100%",
          borderWidth: 1,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: 160,
            flex: 1,
          }}
        >
          <Text
            style={{
              borderBottomWidth: 1,
              flex: 1,
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            {total}
          </Text>
          <Text
            style={{
              borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              flex: 1,
              textAlign: "center",
              textAlignVertical: "center",
              color: "rgba(0, 185, 0, 0.9)",
            }}
          >
            {inTime}
          </Text>
          <Text
            style={{
              borderBottomWidth: 1,
              flex: 1,
              textAlign: "center",
              textAlignVertical: "center",
              color: "rgba(191, 0, 0, 0.9)",
            }}
          >
            {late}
          </Text>
        </View>
        <Text
          style={{
            width: 160,
            flex: 1,
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          {(inTime / total) * 100}%
        </Text>
      </View>
    );
  };
  const TravelTable = (data) => {
    return (
      <View style={styles.container}>
        {/* Уровень 1: Главный заголовок "Отставание" (объединяет 6 колонок) */}
        <View style={styles.headerRow}>
          <View
            style={[styles.headerCell, { flex: 2, borderBottomWidth: 0 }]}
          ></View>
          <View style={[styles.headerCell, { flex: 6 }]}>
            <Text style={styles.headerText}>Отставание</Text>
          </View>
          <View style={[styles.headerCell, { flex: 6 }]}>
            <Text style={styles.headerText}>Опережение</Text>
          </View>
        </View>

        {/* Уровень 2: Подзаголовки "Прибытие в порт" и "Уход в рейс" (по 3 колонки) */}
        <View style={styles.subHeaderRow}>
          <View
            style={[styles.subHeaderCell, { flex: 2, borderBottomWidth: 0 }]}
          >
            <Text style={styles.headerText}>Судно</Text>
          </View>
          <View style={[styles.subHeaderCell, { flex: 3 }]}>
            <Text style={styles.subHeaderText}>Прибытие в порт</Text>
          </View>
          <View style={[styles.subHeaderCell, { flex: 3 }]}>
            <Text style={styles.subHeaderText}>Уход в рейс</Text>
          </View>
          <View style={[styles.subHeaderCell, { flex: 3 }]}>
            <Text style={styles.subHeaderText}>Прибытие в порт</Text>
          </View>
          <View style={[styles.subHeaderCell, { flex: 3 }]}>
            <Text style={styles.subHeaderText}>Уход в рейс</Text>
          </View>
        </View>

        {/* Уровень 3: Подзаголовки "мин/сред/макс" (12 колонок) */}
        <View style={styles.timeHeaderRow}>
          <View
            style={[styles.timeHeaderCell, { flex: 2, paddingHorizontal: 1 }]}
          ></View>
          {/* Отставание: Прибытие */}
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>мин.</Text>
          </View>
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>средн.</Text>
          </View>
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>макс.</Text>
          </View>
          {/* Отставание: Уход */}
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>мин.</Text>
          </View>
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>средн.</Text>
          </View>
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>макс.</Text>
          </View>
          {/* Опережение: Прибытие */}
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>мин.</Text>
          </View>
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>средн.</Text>
          </View>
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>макс.</Text>
          </View>
          {/* Опережение: Уход */}
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>мин.</Text>
          </View>
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>средн.</Text>
          </View>
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>макс.</Text>
          </View>
        </View>

        {/* Данные*/}
        <ScrollView nestedScrollEnabled>
          {data.content.map((item) => (
            <View
              style={styles.dataRow}
              key={`row${item.number}forBlock${props.blockNumber}forCard${
                props.cardNumber ? props.cardNumber : "inReportCreationScreen"
              }screen${currentScreen}`}
            >
              <View style={[styles.dataCell, { flex: 2 }]}>
                <Text style={styles.dataText}>{item.ship}</Text>
              </View>
              {/* Отставание: Прибытие */}
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.lag.arrive.min}</Text>
              </View>
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.lag.arrive.avg}</Text>
              </View>
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.lag.arrive.max}</Text>
              </View>
              {/* Отставание: Уход */}
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.lag.sail.min}</Text>
              </View>
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.lag.sail.avg}</Text>
              </View>
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.lag.sail.max}</Text>
              </View>
              {/* Опережение: Прибытие */}
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.lead.arrive.min}</Text>
              </View>
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.lead.arrive.avg}</Text>
              </View>
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.lead.arrive.max}</Text>
              </View>
              {/* Опережение: Уход */}
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.lead.sail.min}</Text>
              </View>
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.lead.sail.avg}</Text>
              </View>
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.lead.sail.max}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  const PortTable = (data) => {
    return (
      <View style={[styles.container, { width: 550 }]}>
        {/* Уровень 1: Подзаголовки "Запланированное" и "Фактическое" (по 3 колонки) */}
        <View style={styles.subHeaderRow}>
          <View
            style={[styles.subHeaderCell, { flex: 2, borderBottomWidth: 0 }]}
          >
            <Text style={styles.headerText}>Судно</Text>
          </View>
          <View style={[styles.subHeaderCell, { flex: 3 }]}>
            <Text style={styles.headerText}>Запланированное</Text>
          </View>
          <View style={[styles.subHeaderCell, { flex: 3 }]}>
            <Text style={styles.headerText}>Фактическое</Text>
          </View>
        </View>

        {/* Уровень 2: Подзаголовки "мин/сред/макс" (12 колонок) */}
        <View style={styles.timeHeaderRow}>
          <View
            style={[styles.timeHeaderCell, { flex: 2, paddingHorizontal: 1 }]}
          ></View>
          {/* Отставание: Запланированное */}
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>мин.</Text>
          </View>
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>средн.</Text>
          </View>
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>макс.</Text>
          </View>
          {/* Отставание: Фактическое */}
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>мин.</Text>
          </View>
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>средн.</Text>
          </View>
          <View style={styles.timeHeaderCell}>
            <Text style={styles.timeHeaderText}>макс.</Text>
          </View>
        </View>

        {/* Данные*/}
        <ScrollView nestedScrollEnabled>
          {data.content.map((item) => (
            <View
              style={styles.dataRow}
              key={`row${item.number}forBlock${props.blockNumber}forCard${
                props.cardNumber ? props.cardNumber : "inReportCreationScreen"
              }screen${currentScreen}`}
            >
              <View style={[styles.dataCell, { flex: 2 }]}>
                <Text style={styles.dataText}>{item.ship}</Text>
              </View>
              {/* Запланированное */}
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.planned.min}</Text>
              </View>
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.planned.avg}</Text>
              </View>
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.planned.max}</Text>
              </View>
              {/* Фактическое */}
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.real.min}</Text>
              </View>
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.real.avg}</Text>
              </View>
              <View style={styles.dataTimeCell}>
                <Text style={styles.dataText}>{item.real.max}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  switch (data.name) {
    case "records":
      return (
        <ScrollView horizontal>
          <DataTable style={{ height: "100%" }}>
            <DataTable.Header
              style={{ paddingHorizontal: 0, borderBottomWidth: 0 }}
            >
              <DataTable.Title
                textStyle={styles.titleText}
                style={[styles.ship, { borderTopLeftRadius: 8 }]}
              >
                Судно
              </DataTable.Title>
              <DataTable.Title textStyle={styles.titleText} style={styles.date}>
                Дата прибытия в порт
              </DataTable.Title>
              <DataTable.Title textStyle={styles.titleText} style={styles.date}>
                Дата ухода в рейс
              </DataTable.Title>
              <DataTable.Title
                textStyle={styles.titleText}
                style={styles.dateReal}
              >
                Реальная дата прибытия в порт
              </DataTable.Title>
              <DataTable.Title
                textStyle={styles.titleText}
                style={styles.dateReal}
              >
                Реальная дата ухода в рейс
              </DataTable.Title>
              <DataTable.Title
                textStyle={styles.titleText}
                style={styles.comment}
              >
                Комментарий
              </DataTable.Title>
              <DataTable.Title
                textStyle={styles.titleText}
                style={[styles.port, { borderTopRightRadius: 8 }]}
              >
                Порт
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView style={{ height: "100%" }} nestedScrollEnabled>
              {data.content.map((item) => (
                <DataTable.Row
                  key={`row${item.number}forBlock${props.blockNumber}forCard${
                    props.cardNumber
                      ? props.cardNumber
                      : "inReportCreationScreen"
                  }screen${currentScreen}`}
                  style={{ paddingHorizontal: 0, borderBottomWidth: 0 }}
                >
                  <DataTable.Cell
                    textStyle={styles.cellText}
                    style={styles.ship}
                  >
                    {item.ship}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={styles.cellText}
                    style={styles.date}
                    numeric
                  >
                    {new Date(item.arrive_date).toLocaleString()}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={styles.cellText}
                    style={styles.date}
                    numeric
                  >
                    {new Date(item.sail_date).toLocaleString()}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={styles.cellText}
                    style={styles.dateReal}
                    numeric
                  >
                    {new Date(item.arrive_date_real).toLocaleString()}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={styles.cellText}
                    style={styles.dateReal}
                    numeric
                  >
                    {new Date(item.sail_date_real).toLocaleString()}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={styles.cellText}
                    style={styles.comment}
                  >
                    <ScrollView
                      style={{ maxHeight: 45 }}
                      persistentScrollbar
                      nestedScrollEnabled
                    >
                      <Text style={styles.cellText}>{item.comment}</Text>
                    </ScrollView>
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={styles.cellText}
                    style={styles.port}
                  >
                    {item.port}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </ScrollView>
          </DataTable>
        </ScrollView>
      );
    case "points":
      return (
        <ScrollView horizontal>
          <DataTable style={{ height: "100%" }}>
            <DataTable.Header
              style={{ paddingHorizontal: 0, borderBottomWidth: 0 }}
            >
              <DataTable.Title
                textStyle={styles.titleText}
                style={[styles.ship, { borderTopLeftRadius: 8 }]}
              >
                Судно
              </DataTable.Title>
              <DataTable.Title textStyle={styles.titleText} style={styles.date}>
                Все КТ
              </DataTable.Title>
              <DataTable.Title textStyle={styles.titleText} style={styles.date}>
                Прибытия
              </DataTable.Title>
              <DataTable.Title textStyle={styles.titleText} style={styles.date}>
                Уходы
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView style={{ height: "100%" }} nestedScrollEnabled>
              {data.content.map((item) => (
                <DataTable.Row
                  key={`row${item.number}forBlock${props.blockNumber}forCard${
                    props.cardNumber
                      ? props.cardNumber
                      : "inReportCreationScreen"
                  }screen${currentScreen}`}
                  style={{ paddingHorizontal: 0, borderBottomWidth: 0 }}
                >
                  <DataTable.Cell
                    textStyle={styles.cellText}
                    style={styles.ship}
                  >
                    {item.ship}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {CP_StatisticCell(
                      item.arrive.total + item.sail.total,
                      item.arrive.inTime + item.sail.inTime,
                      item.arrive.late + item.sail.late
                    )}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {CP_StatisticCell(
                      item.arrive.total,
                      item.arrive.inTime,
                      item.arrive.late
                    )}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {CP_StatisticCell(
                      item.sail.total,
                      item.sail.inTime,
                      item.sail.late
                    )}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </ScrollView>
          </DataTable>
        </ScrollView>
      );
    case "travel":
      return <ScrollView horizontal>{TravelTable(data)}</ScrollView>;
    case "port":
      return <ScrollView horizontal>{PortTable(data)}</ScrollView>;
    default:
      return <Text>Ошибка, неправильное имя {data.name}</Text>;
  }
}

const styles = StyleSheet.create({
  date: { width: 160, borderWidth: 1, paddingVertical: 2 },
  dateReal: { width: 190, borderWidth: 1, paddingVertical: 2 },
  ship: { width: 125, borderWidth: 1, paddingVertical: 2 },
  port: { width: 50, borderWidth: 1, paddingVertical: 2 },
  comment: { width: 155, borderWidth: 1, paddingVertical: 2 },
  titleText: {
    fontSize: 14,
    textAlign: "center",
    flex: 1,
    fontWeight: "bold",
  },
  cellText: { fontSize: 14, textAlign: "center", width: "100%" },
  //====================
  container: {
    width: 1000,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    borderColor: "#000",
  },
  subHeaderRow: {
    flexDirection: "row",
    borderColor: "#000",
  },
  timeHeaderRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  dataRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  headerCell: {
    borderBottomWidth: 1,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#000",
  },
  subHeaderCell: {
    justifyContent: "center",
    borderBottomWidth: 1,
    alignItems: "center",
    paddingVertical: 4,
    borderRightWidth: 1,
    borderColor: "#000",
  },
  timeHeaderCell: {
    flex: 1,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#000",
  },
  dataCell: {
    paddingHorizontal: 1,
    paddingVertical: 2,
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "#000",
  },
  dataTimeCell: {
    paddingVertical: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#000",
  },
  headerText: {
    fontSize: 14,
    color: "#777",
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 14,
    color: "#222",
    fontWeight: "500",
    textAlign: "center",
  },
  timeHeaderText: {
    fontSize: 14,
    color: "#111",
    textAlign: "center",
  },
  dataText: {
    fontSize: 14,
    textAlign: "center",
  },
});
