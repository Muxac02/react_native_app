import { StyleSheet, View, TouchableHighlight, Alert } from "react-native";
import { useRecords } from "@/contexts/RecordsContext";
import { Icon, MenuIcon } from "@/components/ui/icon";
import { router } from "expo-router";
import { selectAndValidateExcelFile } from "@/utils/ReadAndValidateExcel";
import { useState } from "react";

export default function AddRecordsScreenHeaderButton() {
  const { addRecord } = useRecords();
  const [loading, setLoading] = useState(false);
  const handlePress = async () => {
    setLoading(true);
    const result = await selectAndValidateExcelFile();
    if (result.success) {
      // Работа с валидными данными
      console.log(result.data.length);
      Alert.alert(
        "Внимание",
        `Вы хотите добавить ${result.data.length} записей?`,
        [
          {
            text: "Да",
            onPress: () => {
              result.data.forEach((record) => {
                addRecord({
                  ship: record.ship,
                  port: record.port,
                  arrive_date: record.arrive_date.toLocaleString(),
                  sail_date: record.sail_date.toLocaleString(),
                  arrive_date_real: record.arrive_date_real
                    ? record.arrive_date_real.toLocaleString()
                    : record.arrive_date_real,
                  sail_date_real: record.sail_date_real
                    ? record.sail_date_real.toLocaleString()
                    : record.sail_date_real,
                });
              });
              router.push("/");
            },
          },
          { text: "Нет", onPress: () => {} },
        ],
        { cancelable: true }
      );
    }
    setLoading(false);
  };
  return (
    <View>
      <TouchableHighlight
        style={{ borderRadius: 24 }}
        underlayColor={"rgba(165, 165, 165, 0.4)"}
        onPress={() => {
          handlePress();
        }}
      >
        <Icon as={MenuIcon} style={{ width: 24, height: 24, margin: 12 }} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({});
