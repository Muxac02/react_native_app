import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { Icon, ChevronDownIcon, ChevronUpIcon } from "./ui/icon";
import {
  Sheet,
  ChartPie,
  ChartColumnBig,
  ChartColumnStacked,
} from "lucide-react-native";
import Collapsible from "react-native-collapsible";
import { useState } from "react";
import ReportCardBlock from "./ReportCardBlock";
import { router } from "expo-router";

export default function ReportCardContent(props) {
  const data = props.data;
  const ContentListItem = (props) => {
    let icon = "";
    switch (props.type) {
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
    return (
      <View style={styles.contentTableListItem}>
        <Text style={{ fontSize: 16, marginRight: 2 }}>{props.number}x</Text>
        <Icon as={icon} style={{ height: 24, width: 24 }} />
      </View>
    );
  };
  const ContentList = () => {
    let tables = 0;
    let pies = 0;
    let barsDefault = 0;
    let barsGrouped = 0;
    data.content.map((block) => {
      if (block.type == "table") {
        tables++;
      } else if (block.type == "pie") {
        pies++;
      } else if (block.type == "barDefault") {
        barsDefault++;
      } else if (block.type == "barGrouped") {
        barsGrouped++;
      }
    });
    return (
      <View style={styles.contentTableList}>
        {tables ? (
          ContentListItem({ number: tables, type: "table" })
        ) : (
          <View></View>
        )}
        {pies ? ContentListItem({ number: pies, type: "pie" }) : <View></View>}
        {barsDefault ? (
          ContentListItem({ number: barsDefault, type: "barDefault" })
        ) : (
          <View></View>
        )}
        {barsGrouped ? (
          ContentListItem({ number: barsGrouped, type: "barGrouped" })
        ) : (
          <View></View>
        )}
      </View>
    );
  };
  const [open, setOpen] = useState(false);
  return (
    <TouchableHighlight
      onPress={() => {
        router.push({
          pathname: "/report/[id]",
          params: {
            id: data.number,
          },
        });
      }}
      style={styles.container}
      underlayColor="#6CACE4"
    >
      <View>
        <View style={styles.head}>
          <Text style={styles.titleText}>Отчёт №{data.number}</Text>
          <Text style={styles.titleAuthor}>{data.author}</Text>
        </View>
        <View style={styles.contentTable}>
          <Text style={{ fontSize: 16, marginBottom: 4 }}>Содержит</Text>
          {ContentList()}
        </View>
        <Collapsible collapsed={!open} renderChildrenCollapsed={false}>
          <View>
            {data.content.map((block) => {
              return (
                <ReportCardBlock
                  data={block}
                  key={`reportCard${data.number}BlockConent${block.number}`}
                  cardNumber={data.number}
                />
              );
            })}
          </View>
        </Collapsible>
        <TouchableHighlight
          onPress={() => {
            setOpen(!open);
          }}
          style={styles.contentCollapseButton}
          underlayColor={"rgba(127, 127, 127, 0.4)"}
        >
          <Icon
            as={open ? ChevronUpIcon : ChevronDownIcon}
            style={{ width: 36, height: 36 }}
          />
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingTop: 8,
    boxShadow: "0 4 6.7 0 rgba(0, 0, 0, 0.25)",
    flexDirection: "column",
    marginVertical: 4,
    marginHorizontal: 12,
  },
  head: {
    borderBottomColor: "rgba(127, 127, 127, 0.4)",
    borderBottomWidth: 2,
    paddingBottom: 4,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  titleAuthor: {
    fontSize: 14,
    fontWeight: "500",
  },
  contentTable: {
    borderBottomColor: "rgba(127, 127, 127, 0.4)",
    borderBottomWidth: 2,
    paddingBottom: 4,
  },
  contentTableList: { flexDirection: "row" },
  contentTableListItem: { flexDirection: "row", marginRight: 4 },
  contentCollapseButton: {
    width: "100%",
    height: 36,
    borderRadius: 36,
    marginVertical: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
