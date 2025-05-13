import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import DateTimePicker from "@/components/DateTimePicker";
import SelectField from "@/components/SelectField";
import { useEffect, useState } from "react";

export default function Add() {
  const ships = [
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
    ,
  ];
  const ports = [
    {
      name: "МУР",
      number: 1,
    },
    {
      name: "СПб",
      number: 2,
    },
  ];
  const [ship, setShip] = useState("");
  const [port, setPort] = useState("");
  const [arriveDate, setArriveDate] = useState(new Date(0));
  const [sailDate, setSailDate] = useState(new Date(0));
  const [realArriveDate, setRealArriveDate] = useState(new Date(0));
  const [realSailDate, setRealSailDate] = useState(new Date(0));
  const [errors, setErrors] = useState({});
  const [isFormValid, setFormValid] = useState(false);
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
      <View style={[styles.field, errors.ship ? styles.fieldError : {}]}>
        <Text style={styles.fieldLabel}>Судно *</Text>
        <SelectField
          data={ships}
          label={"Судно"}
          hydr={"ship_add"}
          setItem={setShip}
        />
        <Text style={styles.helperText}>{errors.ship ? errors.ship : ""}</Text>
      </View>
      <View style={[styles.field, errors.port ? styles.fieldError : {}]}>
        <Text style={styles.fieldLabel}>Порт *</Text>
        <SelectField
          data={ports}
          label={"Порт"}
          hydr={"port_add"}
          setItem={setPort}
        />
        <Text style={styles.helperText}>{errors.port ? errors.port : ""}</Text>
      </View>
      <View style={[styles.field, errors.arriveDate ? styles.fieldError : {}]}>
        <Text style={styles.fieldLabel}>Дата прибытия в порт *</Text>
        <DateTimePicker date={arriveDate} setDate={setArriveDate} />
        <Text style={styles.helperText}>
          {errors.arriveDate ? errors.arriveDate : ""}
        </Text>
      </View>
      <View style={[styles.field, errors.sailDate ? styles.fieldError : {}]}>
        <Text style={styles.fieldLabel}>Дата ухода в рейс *</Text>
        <DateTimePicker date={sailDate} setDate={setSailDate} />
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
        <DateTimePicker date={realSailDate} setDate={setRealSailDate} />
        <Text style={styles.helperText}>
          {errors.realSailDate ? errors.realSailDate : ""}
        </Text>
      </View>
      <TouchableHighlight
        onPress={() => {
          console.log("add record", {
            data: {
              ship: ship,
              port: port,
              arriveDate: arriveDate.getTime() == 0 ? null : arriveDate,
              sailDate: sailDate.getTime() == 0 ? null : sailDate,
              realArriveDate:
                realArriveDate.getTime() == 0 ? null : realArriveDate,
              realSailDate: realSailDate.getTime() == 0 ? null : realSailDate,
            },
          });
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
          Добавить
        </Text>
      </TouchableHighlight>
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
