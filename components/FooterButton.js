import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function FooterButton(props) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.activeBlock} />
      <Text style={styles.titleActive}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 64,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  titleInactive: {
    fontSize: 12,
    color: "#6CACE4",
    marginTop: 4,
  },
  titleActive: {
    fontSize: 12,
    color: "#000",
    marginTop: 4,
  },
  activeBlock: {
    width: 50,
    height: 30,
    backgroundColor: "#6CACE4",
    position: "absolute",
    top: 7,
    borderRadius: 15,
  },
  inactiveBlock: {
    display: "none",
    width: 50,
    height: 30,
    backgroundColor: "#6CACE4",
    position: "absolute",
    top: 7,
    borderRadius: 15,
  },
});
