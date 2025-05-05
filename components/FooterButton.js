import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function FooterButton(props) {
  // const Icon = () => {
  //     switch (props.title) {
  //         case "График":
  //             return props.selected == props.id ? <AddActive width={24} height={24}/> : <AddInactive width={24} height={24}/>
  //         case "Избранное":
  //             return props.selected == props.id ? <FavoriteActive width={24} height={24}/> : <FavoriteInactive width={24} height={24}/>
  //         case "Добавить":
  //             return props.selected == props.id ? <ReportsActive width={24} height={24}/> : <ReportsInactive width={24} height={24}/>
  //         case "Отчеты":
  //             return props.selected == props.id ? <ScheduleActive width={24} height={24}/> : <ScheduleInactive width={24} height={24}/>
  //     }
  // }
  console.log(props);
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
