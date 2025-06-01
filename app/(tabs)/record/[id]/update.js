import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@/components/DateTimePicker";
import SelectField from "@/components/SelectField";
import { useEffect, useState } from "react";
import { useSelect } from "@/contexts/SelectContext";
import { useRecords } from "@/contexts/RecordsContext";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";

export default function Update() {
  const { id } = useLocalSearchParams();
  const { updateRecord, records, deleteRecord } = useRecords();
  const { ships, ports } = useSelect();
  let prevData = records.find((record) => record.number == id);
  if (!prevData) return <ActivityIndicator />;
  const [ship, setShip] = useState(prevData.ship);
  const [port, setPort] = useState(prevData.port);
  const [arriveDate, setArriveDate] = useState(new Date(prevData.arrive_date));
  const [sailDate, setSailDate] = useState(new Date(prevData.sail_date));
  const [realArriveDate, setRealArriveDate] = useState(
    new Date(prevData.arrive_date_real ? prevData.arrive_date_real : 0)
  );
  const [realSailDate, setRealSailDate] = useState(
    new Date(prevData.sail_date_real ? prevData.sail_date_real : 0)
  );
  const [comment, setComment] = useState(prevData.comment);
  const [errors, setErrors] = useState({});
  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    if (prevData) {
      setShip(prevData.ship);
      setPort(prevData.port);
      setArriveDate(new Date(prevData.arrive_date));
      setSailDate(new Date(prevData.sail_date));
      setRealArriveDate(
        new Date(prevData.arrive_date_real ? prevData.arrive_date_real : 0)
      );
      setRealSailDate(
        new Date(prevData.sail_date_real ? prevData.sail_date_real : 0)
      );
      setComment(prevData.comment);
    }
  }, [id, prevData]);

  useEffect(() => {
    validateForm();
  }, [ship, port, arriveDate, sailDate, realArriveDate, realSailDate]);
  const validateForm = () => {
    let errors = {};
    if (!ship) {
      errors.ship = "Выберите судно";
    }
    if (!port) {
      errors.port = "Выберите порт";
    }
    if (arriveDate.getTime() == 0) {
      errors.arriveDate = "Выберите дату прибытия в порт";
    }
    if (sailDate.getTime() == 0) {
      errors.sailDate = "Выберите дату ухода в рейс";
    }
    if (
      sailDate.getTime() < arriveDate.getTime() &&
      arriveDate.getTime() != 0
    ) {
      errors.sailDate = "Дата ухода должна быть позже даты прихода";
    }
    if (realSailDate.getTime() != 0 && realArriveDate.getTime() == 0) {
      errors.realArriveDate = "Укажите реальную дату прибытия";
    }
    if (realSailDate.getTime() != 0 && realArriveDate.getTime() != 0) {
      if (realSailDate.getTime() < realArriveDate.getTime()) {
        errors.realSailDate =
          "Реальная дата ухода должна быть позже реальной даты прибытия";
      }
    }
    if (Object.keys(errors).length === 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
    setErrors(errors);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.field, errors.ship ? styles.fieldError : {}]}>
          <Text style={styles.fieldLabel}>Судно *</Text>
          <SelectField
            data={ships}
            label={ships.find((s) => s.number == prevData.ship).name}
            hydr={"ship_add"}
            setItem={setShip}
            defaultItem={prevData.ship}
          />
          <Text style={styles.helperText}>
            {errors.ship ? errors.ship : ""}
          </Text>
        </View>
        <View style={[styles.field, errors.port ? styles.fieldError : {}]}>
          <Text style={styles.fieldLabel}>Порт *</Text>
          <SelectField
            data={ports}
            label={ports.find((s) => s.number == prevData.port).name}
            hydr={"port_add"}
            setItem={setPort}
            defaultItem={prevData.port}
          />
          <Text style={styles.helperText}>
            {errors.port ? errors.port : ""}
          </Text>
        </View>
        <View
          style={[styles.field, errors.arriveDate ? styles.fieldError : {}]}
        >
          <Text style={styles.fieldLabel}>Дата прибытия в порт *</Text>
          <DateTimePicker date={arriveDate} setDate={setArriveDate} />
          <Text style={styles.helperText}>
            {errors.arriveDate ? errors.arriveDate : ""}
          </Text>
        </View>
        <View style={[styles.field, errors.sailDate ? styles.fieldError : {}]}>
          <Text style={styles.fieldLabel}>Дата ухода в рейс *</Text>
          <DateTimePicker
            minDate={arriveDate}
            date={sailDate}
            setDate={setSailDate}
          />
          <Text style={styles.helperText}>
            {errors.sailDate ? errors.sailDate : ""}
          </Text>
        </View>
        <View
          style={[styles.field, errors.realArriveDate ? styles.fieldError : {}]}
        >
          <Text style={styles.fieldLabel}>Реальная дата прибытия в порт</Text>
          <DateTimePicker date={realArriveDate} setDate={setRealArriveDate} />
          <Text style={styles.helperText}>
            {errors.realArriveDate ? errors.realArriveDate : ""}
          </Text>
        </View>
        <View
          style={[styles.field, errors.realSailDate ? styles.fieldError : {}]}
        >
          <Text style={styles.fieldLabel}>Реальная дата ухода в рейс</Text>
          <DateTimePicker
            minDate={realArriveDate}
            date={realSailDate}
            setDate={setRealSailDate}
          />
          <Text style={styles.helperText}>
            {errors.realSailDate ? errors.realSailDate : ""}
          </Text>
        </View>
        <View style={[styles.field, errors.comment ? styles.fieldError : {}]}>
          <Text style={styles.fieldLabel}>Комментарий</Text>
          <TextInput
            style={{ fontSize: 16, paddingLeft: 10 }}
            onChangeText={(ev) => setComment(ev)}
            value={comment}
          />
        </View>
        <TouchableHighlight
          onPress={() => {
            console.log("update record");
            updateRecord(id, {
              ship: ship,
              port: port,
              arrive_date: arriveDate.toLocaleString(),
              sail_date: sailDate.toLocaleString(),
              arrive_date_real:
                realArriveDate.getTime() == 0
                  ? null
                  : realArriveDate.toLocaleString(),
              sail_date_real:
                realSailDate.getTime() == 0
                  ? null
                  : realSailDate.toLocaleString(),
              comment: comment ? comment : null,
            });
            router.push(`/record/${id}`);
          }}
          style={[
            styles.addButton,
            {
              backgroundColor: isFormValid
                ? buttonColors.active
                : buttonColors.inactive,
            },
          ]}
          disabled={!isFormValid}
          underlayColor={"#6CACE4"}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: isFormValid
                  ? buttonTextColors.active
                  : buttonTextColors.inactive,
              },
            ]}
          >
            Изменить
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            Alert.alert("Внимание", "Вы действительно хотите удалить запись?", [
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => {
                  deleteRecord(id);
                  router.push(`/`);
                  prevData = null;
                },
              },
            ]);
          }}
          style={[
            styles.addButton,
            {
              backgroundColor: "rgb(182, 0, 0)",
            },
          ]}
          underlayColor={"rgb(112, 0, 0)"}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: isFormValid
                  ? buttonTextColors.active
                  : buttonTextColors.inactive,
              },
            ]}
          >
            Удалить
          </Text>
        </TouchableHighlight>
      </ScrollView>
    </SafeAreaView>
  );
}

const buttonColors = {
  active: "rgb(0, 50, 116)",
  inactive: "rgba(127, 127, 127, 0.4)",
};
const buttonTextColors = {
  active: "rgb(255, 255, 255)",
  inactive: "rgba(95, 96, 98, 0.9)",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(127, 127, 127, 0.4)",
    justifyContent: "flex-start",
  },
  field: {
    marginHorizontal: 12,
    marginTop: 8,
    backgroundColor: "#fff",
    paddingTop: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(97, 97, 97, 0.8)",
  },
  fieldError: {
    borderColor: "red",
    marginBottom: 12,
  },
  fieldLabel: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  addButton: {
    margin: 12,
    padding: 16,
    paddingHorizontal: 42,
    borderRadius: 12,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  helperText: {
    position: "absolute",
    bottom: -16,
    fontSize: 12,
    color: "red",
  },
});
