import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Icon, CloseIcon } from "@/components/ui/icon";

export default function DateTimePicker(props) {
  //const [date, setDate] = useState(clientTime);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    props.setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: props.date,
      onChange,
      mode: currentMode,
      is24Hour: true,
      maximumDate: new Date(new Date().getFullYear() + 1, 11, 31),
      minimumDate: new Date(new Date().getFullYear(), 0, 1),
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={showDatepicker}
        style={styles.field}
        underlayColor={"rgba(127, 124, 124, 0.4)"}
      >
        <Text style={styles.fieldText}>
          {props.date.getTime() != 0 ? props.date.toLocaleDateString() : "Дата"}
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={showTimepicker}
        style={styles.field}
        underlayColor={"rgba(127, 124, 124, 0.4)"}
      >
        <Text style={styles.fieldText}>
          {props.date.getTime() != 0
            ? props.date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Время"}
        </Text>
      </TouchableHighlight>
      {props.date.getTime() != 0 ? (
        <TouchableHighlight
          onPress={() => {
            props.setDate(new Date(0));
          }}
          style={styles.clearBut}
          underlayColor={"rgba(127, 124, 124, 0.4)"}
        >
          <Icon as={CloseIcon} size="md" />
        </TouchableHighlight>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  field: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "rgba(97, 97, 97, 0.8)",
    marginHorizontal: 4,
    marginBottom: 2,
  },
  fieldText: { fontSize: 16, textAlign: "left" },
  clearBut: {
    backgroundColor: "#fff",
    borderWidth: 1,
    padding: 4,
    borderRadius: 12,
    marginRight: 4,
  },
});
