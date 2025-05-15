import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

export default function ReportCardBlockTable(props) {
  const data = props.data;
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
          <DataTable.Title textStyle={styles.titleText} style={styles.dateReal}>
            Реальная дата прибытия в порт
          </DataTable.Title>
          <DataTable.Title textStyle={styles.titleText} style={styles.dateReal}>
            Реальная дата ухода в рейс
          </DataTable.Title>
          <DataTable.Title textStyle={styles.titleText} style={styles.comment}>
            Комментарий
          </DataTable.Title>
          <DataTable.Title
            textStyle={styles.titleText}
            style={[styles.port, { borderTopRightRadius: 8 }]}
          >
            Порт
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView style={{ height: "100%" }}>
          {data.content.map((item) => (
            <DataTable.Row
              key={`row${item.number}forBlock${props.blockNumber}forCard${props.cardNumber}`}
              style={{ paddingHorizontal: 0, borderBottomWidth: 0 }}
            >
              <DataTable.Cell textStyle={styles.cellText} style={styles.ship}>
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
              <DataTable.Cell textStyle={styles.cellText} style={styles.port}>
                {item.port}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </ScrollView>
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  date: { width: 160, borderWidth: 1 },
  dateReal: { width: 190, borderWidth: 1 },
  ship: { width: 125, borderWidth: 1 },
  port: { width: 50, borderWidth: 1 },
  comment: { width: 155, borderWidth: 1 },
  titleText: { fontSize: 14, textAlign: "center", width: "100%" },
  cellText: { fontSize: 14, textAlign: "center", width: "100%" },
});
