import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import ReportCardBlock from "@/components/ReportCardBlock";
import DateTimePicker from "@/components/DateTimePicker";
import { Icon, CloseCircleIcon, MenuIcon } from "@/components/ui/icon";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useSelect } from "@/contexts/SelectContext";
import { API_URL } from "@/utils/apiurl";
import { useReports } from "@/contexts/ReportsContext";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function AddReport() {
  const author = useAuth().user.number;
  const { addReport } = useReports();
  const { ships } = useSelect();
  const [data, setData] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState([]);
  const [name, setName] = useState("");
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
  const [ModalOpenedToAddBlock, setModalOpenedToAddBlock] = useState(true);
  const [changingBlock, setChangingBlock] = useState(0);
  const clearSelectedInfo = () => {
    setShipsSelected([]);
    setStartDate(new Date(0));
    setFinishDate(new Date(0));
    setModalOpenedToAddBlock(true);
    setName("");
    setChangingBlock(0);
  };
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
  const handleBlockChange = (number) => {
    let newData = [...data];
    newData.forEach((block) => {
      if (block.number == number) {
        block.type = "table";
        block.name = name;
        block.isGroup = shipsSelected.length == 1 ? false : true;
        block.ships = shipsSelected;
        block.dateFrom = startDate;
        block.dateTo = finishDate;
        block.loading = true;
        block.content = [];
      }
    });
    setData(newData);
    setShouldUpdate([...shouldUpdate, number]);
  };
  const handleBlockDelete = (number) => {
    let newData = [...data.filter((block) => block.number != number)];
    setData(newData);
  };
  const handleBlockCopy = (number) => {
    let newData = [...data];
    let newBlock = { ...newData.find((block) => block.number == number) };
    newBlock.number = newData.length + 1;
    newData.push(newBlock);
    setData(newData);
  };
  const ChangeBlockButton = ({ number }) => {
    const block = data.find((b) => b.number == number);
    const copyBlockInfo = () => {
      setShipsSelected(block.ships);
      setStartDate(block.dateFrom);
      setFinishDate(block.dateTo);
      setName(block.name);
      setModalOpenedToAddBlock(false);
      setChangingBlock(number);
    };
    return (
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            null,
            "Выберите, что вы хотите сделать с блоком",
            [
              {
                text: "Изменить",
                onPress: () => {
                  copyBlockInfo();
                  setModalVisible(true);
                },
                style: "default",
              },
              {
                text: "Копировать",
                onPress: () => {
                  handleBlockCopy(number);
                },
                style: "default",
              },
              {
                text: "Удалить",
                onPress: () => {
                  handleBlockDelete(number);
                },
                style: "destructive",
              },
            ],
            { cancelable: true }
          );
        }}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <Icon as={MenuIcon} style={{ width: 32, height: 32 }} />
      </TouchableOpacity>
    );
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
              <ChangeBlockButton number={block.number} />
              <ReportCardBlock data={block} loading={block.loading} />
            </View>
          );
        })}
        <TouchableHighlight
          onPress={() => {
            setModalVisible(true);
            setModalOpenedToAddBlock(true);
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
              author: author,
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
          onRequestClose={() => {
            clearSelectedInfo();
            setModalVisible(false);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Выберите тип блока</Text>
              {selectVariants.map((option) => (
                <TouchableOpacity
                  key={option.number}
                  style={[
                    styles.optionButton,
                    {
                      borderRadius: 12,
                      backgroundColor:
                        option.name == name
                          ? "rgba(160, 160, 160, 0.38)"
                          : "#fff",
                    },
                  ]}
                  onPress={() => handleOptionSelect(option.name)}
                >
                  <Text style={styles.optionText}>
                    {blockNames(option.name)}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  clearSelectedInfo();
                  setModalVisible(false);
                }}
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
          onRequestClose={() => {
            clearSelectedInfo();
            setInfoModalVisible(false);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.infoModalContent}>
              <TouchableOpacity
                style={{ position: "absolute", right: 12, top: 8 }}
                onPress={() => {
                  clearSelectedInfo();
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
                  minDate={startDate.getTime() == 0 ? undefined : startDate}
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
                  if (ModalOpenedToAddBlock) {
                    handleBlockAdded(data.length + 1);
                  } else {
                    handleBlockChange(changingBlock);
                  }
                  setInfoModalVisible(false);
                  clearSelectedInfo();
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
