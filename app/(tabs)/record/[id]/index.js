import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import TextField from "@/components/TextField";
import { useLocalSearchParams } from "expo-router";
import { useRecords } from "@/contexts/RecordsContext";
import { useSelect } from "@/contexts/SelectContext";
import { useEffect, useState } from "react";
import { router } from "expo-router";

export default function Record() {
  const { id } = useLocalSearchParams();
  const { records, loading, error, changeStatus } = useRecords();
  const { ships, ports } = useSelect();
  const data = records.find((record) => record.number == id);
  if (!data) return <ActivityIndicator />;
  const ship = ships.find((s) => s.number == data.ship).name;
  const port = ports.find((s) => s.number == data.port).name;
  const arriveButtonDisabled = data.arrive_date_real ? true : false;
  const sailButtonDisabled = data.sail_date_real
    ? true
    : arriveButtonDisabled
    ? false
    : true;
  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topTextContainer}>
        <Text style={styles.topText}>
          {data.created_at
            ? `Создана: ${new Date(data.created_at).toLocaleString()}`
            : "Ошибка, нету даты создания"}
        </Text>
        <Text style={styles.topText}>
          {data.updated_at
            ? `Изменена: ${new Date(data.updated_at).toLocaleString()}`
            : "Не изменялась"}
        </Text>
      </View>
      <View style={styles.headContent}>
        <View
          style={{
            flex: 1,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <Image
            source={require("../../../../assets/ships/sibir1.png")}
            style={{ width: "100%", height: undefined, aspectRatio: 152 / 100 }}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 12 }}>
          <Text style={[styles.topTextField, { marginBottom: 4 }]}>
            {ship ? ship : "Ошибка"}
          </Text>
          <Text style={[styles.topTextField, { marginTop: 4 }]}>
            {port ? `Порт: ${port}` : "Ошибка"}
          </Text>
        </View>
      </View>
      <TextField
        title={"Дата прибытия в порт"}
        type={"Date"}
        text={data.arrive_date}
      />
      <TextField
        title={"Дата ухода в рейс"}
        type={"Date"}
        text={data.sail_date}
      />
      <TextField
        title={"Реальная дата прибытия в порт"}
        type={"Date"}
        text={data.arrive_date_real}
      />
      <TextField
        title={"Реальная дата ухода в рейс"}
        type={"Date"}
        text={data.sail_date_real}
      />
      <TextField title={"Комментарий"} text={data.comment} />
      <View style={styles.buttonGroup}>
        <TouchableHighlight
          disabled={arriveButtonDisabled}
          underlayColor={"rgb(108, 172, 228)"}
          onPress={() => {
            console.log("1 pressed");
            changeStatus(data.number);
          }}
          style={[
            styles.button,
            arriveButtonDisabled ? styles.inactiveButton : styles.activeButton,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              arriveButtonDisabled ? styles.inactiveText : styles.activeText,
            ]}
          >
            Прибыл в порт
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          disabled={sailButtonDisabled}
          underlayColor={"rgb(108, 172, 228)"}
          onPress={() => {
            console.log("2 pressed");
            changeStatus(data.number);
          }}
          style={[
            styles.button,
            sailButtonDisabled ? styles.inactiveButton : styles.activeButton,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              sailButtonDisabled ? styles.inactiveText : styles.activeText,
            ]}
          >
            Ушел в рейс
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={"rgb(108, 172, 228)"}
          onPress={() => {
            console.log("3 pressed");
            router.push({
              pathname: "/record/[id]/update",
              params: {
                id: data.number,
              },
            });
          }}
          style={[
            styles.button,
            styles.activeButton,
            { backgroundColor: "rgb(0, 148, 37)" },
          ]}
        >
          <Text style={[styles.buttonText, styles.activeText]}>
            Редактировать
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(127, 127, 127, 0.4)",
  },
  headContent: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginBottom: 8,
  },
  topTextField: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(95, 96, 98, 0.9)",
    backgroundColor: "#fff",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    padding: 8,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    width: "100%",
  },
  textField: {
    borderBottomWidth: 1,
    borderColor: "rgba(95, 96, 98, 0.9)",
    marginVertical: 4,
    backgroundColor: "#fff",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    marginHorizontal: 12,
    padding: 4,
    textAlign: "left",
    fontSize: 16,
    lineHeight: 22,
  },
  topTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  topText: {
    fontSize: 12,
  },
  buttonGroup: {
    flexDirection: "row",
    marginHorizontal: 6,
    marginVertical: 8,
  },
  button: {
    flex: 1,
    padding: 4,
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 6,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 14,
    fontWeight: 500,
  },
  activeText: {
    color: "#fff",
  },
  inactiveText: {
    color: "rgba(95, 96, 98, 0.9)",
  },
  activeButton: {
    backgroundColor: "rgb(2, 94, 161)",
  },
  inactiveButton: {
    backgroundColor: "rgba(127, 127, 127, 0.4)",
  },
});
