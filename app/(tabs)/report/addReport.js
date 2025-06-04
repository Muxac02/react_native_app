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
import { useEffect, useState } from "react";
import ReportCardBlock from "@/components/ReportCardBlock";
import DateTimePicker from "@/components/DateTimePicker";
import SelectField from "@/components/SelectField";
import { Icon, CloseCircleIcon } from "@/components/ui/icon";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useSelect } from "@/contexts/SelectContext";
import { API_URL } from "@/utils/apiurl";
import { useReports } from "@/contexts/ReportsContext";
import { router } from "expo-router";

export default function AddReport() {
  const { addReport } = useReports();
  const { ships } = useSelect();
  const [data, setData] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState([]);
  const [name, setName] = useState("records");
  const [startDate, setStartDate] = useState(new Date(0));
  const [finishDate, setFinishDate] = useState(new Date(0));
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [shipsSelected, setShipsSelected] = useState([]);
  const selectVariants = [
    { number: 1, name: "records" },
    { number: 2, name: "points" },
    { number: 3, name: "travel" },
    { number: 4, name: "port" },
  ];

  const handleOptionSelect = (name) => {
    setName(name);
    setModalVisible(false);
    setInfoModalVisible(true);
  };
  const handleBlockAdded = (number) => {
    let newData = [...data];
    newData.push({
      number: number,
      type: "table",
      name: name,
      isGroup: shipsSelected.length == 1 ? false : true,
      ships: shipsSelected,
      dateFrom: startDate,
      dateTo: finishDate,
      loading: true,
      content: [],
    });
    setShouldUpdate([...shouldUpdate, number]);
    setData(newData);
    setShipsSelected([]);
  };

  useEffect(() => {
    async function fetch_content_for_block(updateNumber) {
      try {
        const body = data.find((block) => block.number == updateNumber);
        const response = await fetch(`${API_URL}/reports/create_block`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: body.name,
            ships: body.ships,
            dateFrom: body.dateFrom,
            dateTo: body.dateTo,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch records:", response.status);
        }
        const content = await response.json();
        //console.log(content);
        let newData = [...data];
        newData.forEach((block) => {
          if (block.number == updateNumber) {
            block.loading = false;
            block.content = content;
          }
        });
        setData(newData);
        let newShouldUpdate = [
          ...shouldUpdate.filter((v) => v != updateNumber),
        ];
        setShouldUpdate(newShouldUpdate);
        return true;
      } catch (err) {
        console.log(err.message);
        return false;
      }
    }
    //console.log("data changed, fetch data for data.number: ", shouldUpdate);
    if (shouldUpdate.length != 0) {
      shouldUpdate.forEach((numb) => {
        fetch_content_for_block(numb);
      });
    }
  }, [shouldUpdate]);

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
            <View
              style={styles.block}
              key={`reportCreationScreenBlockConent${block.number}`}
            >
              <ReportCardBlock data={block} loading={block.loading} />
            </View>
          );
        })}
        <TouchableHighlight
          onPress={() => {
            setModalVisible(true);
          }}
          underlayColor={"#f0f0f0"}
          style={[
            styles.button,
            {
              backgroundColor: "#6CACE4",
            },
          ]}
          // disabled={shouldUpdate.length != 0}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>+</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            addReport({
              author: 1,
              created_at: new Date().toLocaleString(),
              content: data,
            });
            router.push("/reports");
            setData([]);
          }}
          underlayColor={"#6CACE4"}
          style={[
            styles.createButton,
            {
              backgroundColor:
                shouldUpdate.length != 0 || data.length == 0
                  ? "#aaa"
                  : "#025EA1",
            },
          ]}
          disabled={shouldUpdate.length != 0 || data.length == 0}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  shouldUpdate.length != 0 || data.length == 0
                    ? "#666"
                    : "#fff",
              },
            ]}
          >
            Создать отчет
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
                <DateTimePicker
                  minDate={startDate}
                  date={finishDate}
                  setDate={setFinishDate}
                />
              </View>
              <Text style={styles.modalTitle}>Судно/суда</Text>
              <ScrollView style={{ maxHeight: 200 }}>
                <View>
                  {ships.map((ship) => (
                    <BouncyCheckbox
                      size={25}
                      fillColor="rgb(0, 50, 116)"
                      unFillColor="#FFFFFF"
                      text={ship.name}
                      key={`checkBox${ship.number}`}
                      isChecked={
                        shipsSelected.findIndex((s) => s == ship.number) != -1
                      }
                      textStyle={{
                        textDecorationLine:
                          shipsSelected.findIndex((s) => s == ship.number) != -1
                            ? "none"
                            : "line-through",
                      }}
                      onPress={(isChecked) => {
                        if (isChecked) {
                          setShipsSelected([...shipsSelected, ship.number]);
                        } else {
                          setShipsSelected(
                            shipsSelected.filter((s) => s !== ship.number)
                          );
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
                      shipsSelected.length == 0 ? "#f0f0f0" : "rgb(0, 50, 116)",
                  },
                ]}
                onPress={() => {
                  handleBlockAdded(data.length + 1);
                  setInfoModalVisible(false);
                }}
                disabled={shipsSelected.length == 0}
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
  createButton: {
    backgroundColor: "#025EA1",
    padding: 8,
    borderRadius: 12,
    marginHorizontal: 4,
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
