import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Icon, CloseIcon } from "@/components/ui/icon";

export default function DateTimePicker(props) {
  const date = props.date;
  const dateChange = props.changed;
  const onChange = (event, selectedDate) => {
    props.onChange({ ...event, dir: props.dir, pos: props.pos }, selectedDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
      maximumDate: new Date(new Date().getFullYear() + 1, 11, 31),
      minimumDate: new Date(2010, 0, 1),
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
        style={styles.dateField}
        underlayColor={"rgba(127, 124, 124, 0.4)"}
      >
        <Text style={styles.fieldText}>
          {dateChange ? date.toLocaleDateString() : "Без ограничений"}
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={showTimepicker}
        style={styles.timeField}
        underlayColor={"rgba(127, 124, 124, 0.4)"}
      >
        <Text style={styles.fieldText}>
          {dateChange
            ? date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </Text>
      </TouchableHighlight>
      {dateChange ? (
        <TouchableHighlight
          onPress={() => {
            props.onClear(props.dir, props.pos);
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
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 4,
  },
  dateField: {
    flex: 1,
    backgroundColor: "rgba(190, 190, 190, 0.4)",
    borderBottomWidth: 1,
    borderColor: "rgba(95, 96, 98, 0.9)",
    borderTopLeftRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 2,
  },
  timeField: {
    flex: 1,
    backgroundColor: "rgba(190, 190, 190, 0.4)",
    borderBottomWidth: 1,
    borderColor: "rgba(95, 96, 98, 0.9)",
    borderTopRightRadius: 8,
    marginRight: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 2,
  },
  fieldText: { fontSize: 16, textAlign: "left" },
  clearBut: {
    backgroundColor: "#fff",
    borderWidth: 1,
    padding: 2,
    borderRadius: 12,
    margin: 2,
  },
});
