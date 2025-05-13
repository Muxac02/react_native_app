import React from "react";
import { StyleSheet, Text } from "react-native";

export default function TextField(props) {
  return (
    <Text style={styles.textField}>
      {`${props.title}:\n${
        props.text
          ? props.type == "Date"
            ? new Date(props.text).toLocaleString()
            : props.text
          : " "
      }`}
    </Text>
  );
}

const styles = StyleSheet.create({
  textField: {
    borderBottomWidth: 1,
    borderColor: "rgba(95, 96, 98, 0.9)",
    marginVertical: 4,
    backgroundColor: "#fff",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    marginHorizontal: 12,
    padding: 4,
    paddingHorizontal: 8,
    textAlign: "left",
    fontSize: 16,
    lineHeight: 22,
  },
});
