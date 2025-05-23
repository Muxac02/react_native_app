import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import ReportCardBlock from "@/components/ReportCardBlock";
import DateTimePicker from "@/components/DateTimePicker";
import SelectField from "@/components/SelectField";
import { Icon, CloseCircleIcon } from "@/components/ui/icon";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function AddReport() {
  const shipsList = [
    {
      number: 1,
      name: 'а\\л "Ямал"',
    },
    {
      number: 2,
      name: 'а\\л "50 лет Победы"',
    },
    {
      number: 3,
      name: 'а\\л "Таймыр"',
    },
    {
      number: 4,
      name: 'а\\л "Вайгач"',
    },
    {
      number: 5,
      name: 'СУАЛ "Арктика"',
    },
    {
      number: 6,
      name: 'СУАЛ "Сибирь"',
    },
    {
      number: 7,
      name: 'СУАЛ "Урал"',
    },
    {
      number: 8,
      name: 'а\\л-к "Севморпуть"',
    },
    {
      number: 9,
      name: 'а.т.о. "Имандра"',
    },
    {
      number: 10,
      name: 'а.т.о. "Лотта"',
    },
    {
      number: 11,
      name: 'с-т "Серебрянка"',
    },
    {
      number: 12,
      name: 'к-в "Россита"',
    },
  ];
  const [data, setData] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(0);
  const [name, setName] = useState("records");
  const [startDate, setStartDate] = useState(new Date(0));
  const [finishDate, setFinishDate] = useState(new Date(0));
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [ships, setShips] = useState([]);
  const selectVariants = [
    { number: 1, name: "records" },
    { number: 2, name: "points" },
    { number: 3, name: "travel" },
    { number: 4, name: "port" },
  ];

  const dataRef = useRef(data);
  dataRef.current = data;
  const handleOptionSelect = (name) => {
    setName(name);
    setModalVisible(false);
    setInfoModalVisible(true);
  };
  const handleBlockAdded = (number) => {
    let newData = data;
    newData.push({
      number: number,
      type: "table",
      name: name,
      isGroup: ships.length == 1,
      ships: ships,
      dateFrom: startDate.toDateString(),
      dateTo: finishDate.toDateString(),
      content: [],
    });
    setData(newData);
    setShips([]);
    // const int = setTimeout(() => {
    //   let newData = data;
    //   newData.find((item) => item.number == number).content = [
    //     {
    //       number: 1,
    //       ship: 'СУАЛ "Сибирь"',
    //       port: "МУР",
    //       arrive_date: "2025-03-01T10:00:00.000000",
    //       sail_date: "2025-03-01T10:00:00.000000",
    //       arrive_date_real: "2025-03-01T10:00:00.000000",
    //       sail_date_real: "2025-03-01T10:00:00.000000",
    //       comment:
    //         "График от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025",
    //     },
    //   ];
    //   setData(newData);
    // }, 3000);
  };
  const blockNames = (name) => {
    switch (name) {
      case "records":
        return "Записи за промежуток";
      case "points":
        return "Статистика прохождения КТ";
      case "travel":
        return "Статистика времени следования";
      case "port":
        return "Статистика времени нахождения в порту";
      default:
        return "Ошибка";
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {data.map((block) => {
          return (
            <View style={styles.block}>
              <ReportCardBlock
                data={block}
                key={`reportCreationScreenBlockConent${block.number}`}
                loading={block.content.length != 0 ? false : true}
              />
            </View>
          );
        })}
        <TouchableHighlight
          onPress={() => {
            setModalVisible(true);
          }}
          underlayColor={"#6CACE4"}
          style={[
            styles.button,
            { backgroundColor: shouldUpdate == 0 ? "#025EA1" : "#f0f0f0" },
          ]}
          disabled={shouldUpdate != 0}
        >
          <Text
            style={[
              styles.buttonText,
              { color: shouldUpdate == 0 ? "#fff" : "#000" },
            ]}
          >
            +
          </Text>
        </TouchableHighlight>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Выберите тип блока</Text>
              {selectVariants.map((option) => (
                <TouchableOpacity
                  key={option.number}
                  style={styles.optionButton}
                  onPress={() => handleOptionSelect(option.name)}
                >
                  <Text style={styles.optionText}>
                    {blockNames(option.name)}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Отмена</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          visible={infoModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setInfoModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.infoModalContent}>
              <TouchableOpacity
                style={{ position: "absolute", right: 12, top: 8 }}
                onPress={() => {
                  setInfoModalVisible(false);
                }}
              >
                <Icon as={CloseCircleIcon} style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
              <View>
                <Text style={styles.modalTitle}>Дата начала периода</Text>
                <DateTimePicker date={startDate} setDate={setStartDate} />
              </View>
              <View>
                <Text style={styles.modalTitle}>Дата конца периода</Text>
                <DateTimePicker date={finishDate} setDate={setFinishDate} />
              </View>
              <Text style={styles.modalTitle}>Судно/суда</Text>
              <ScrollView style={{ maxHeight: 200 }}>
                <View>
                  {shipsList.map((ship) => (
                    <BouncyCheckbox
                      size={25}
                      fillColor="rgb(0, 50, 116)"
                      unFillColor="#FFFFFF"
                      text={ship.name}
                      key={`checkBox${ship.number}`}
                      textStyle={{
                        textDecorationLine:
                          ships.findIndex((s) => s == ship.number) != -1
                            ? "none"
                            : "line-through",
                      }}
                      onPress={(isChecked) => {
                        if (isChecked) {
                          setShips([...ships, ship.number]);
                        } else {
                          setShips(ships.filter((s) => s !== ship.number));
                        }
                      }}
                      style={{ marginVertical: 4 }}
                    />
                  ))}
                </View>
              </ScrollView>
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  {
                    backgroundColor:
                      startDate.getTime() == 0 ||
                      finishDate.getTime() == 0 ||
                      ships.length == 0
                        ? "#f0f0f0"
                        : "rgb(0, 50, 116)",
                  },
                ]}
                onPress={() => {
                  handleBlockAdded(data.length + 1);
                  setInfoModalVisible(false);
                }}
                disabled={
                  startDate.getTime() == 0 ||
                  finishDate.getTime() == 0 ||
                  ships.length == 0
                }
              >
                <Text style={styles.cancelText}>Подтвердить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(127, 127, 127, 0.4)",
  },
  button: {
    backgroundColor: "#025EA1",
    padding: 8,
    borderRadius: 12,
    marginHorizontal: 4,
    width: 64,
    height: 48,
    alignSelf: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  block: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 4,
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  infoModalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  optionButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 12,
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
});
