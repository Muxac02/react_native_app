import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import AddInactive from "../assets/FooterIcons/AddInactive.svg"
import FavoriteInactive from "../assets/FooterIcons/FavoriteInactive.svg"
import ReportsInactive from "../assets/FooterIcons/ReportsInactive.svg"
import ScheduleInactive from "../assets/FooterIcons/ScheduleInactive.svg"
import AddActive from "../assets/FooterIcons/AddActive.svg"
import FavoriteActive from "../assets/FooterIcons/FavoriteActive.svg"
import ReportsActive from "../assets/FooterIcons/ReportsActive.svg"
import ScheduleActive from "../assets/FooterIcons/ScheduleActive.svg"

export default function FooterButton(props) {
    const Icon = () => {
        switch (props.title) {
            case "График":
                return props.selected == props.id ? <AddActive width={24} height={24}/> : <AddInactive width={24} height={24}/>
            case "Избранное":
                return props.selected == props.id ? <FavoriteActive width={24} height={24}/> : <FavoriteInactive width={24} height={24}/>
            case "Добавить":
                return props.selected == props.id ? <ReportsActive width={24} height={24}/> : <ReportsInactive width={24} height={24}/>
            case "Отчеты":
                return props.selected == props.id ? <ScheduleActive width={24} height={24}/> : <ScheduleInactive width={24} height={24}/>
        }
    }
    return (
      <TouchableOpacity style={styles.container} onPress={()=>{props.handleSelected(props.id)}}>
        <View style={props.selected == props.id ? styles.activeBlock : styles.inactiveBlock} />
        {Icon()}
        <Text style={props.selected == props.id ? styles.titleActive: styles.titleInactive}>{props.title}</Text>
      </TouchableOpacity>
      );
    }

const styles = StyleSheet.create({
  container:{
    minWidth: 64,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  titleInactive: {
    fontSize: 12,
    color: "#6CACE4",
    marginTop: 4
  },
  titleActive: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4
  },
  activeBlock: {
    width: 50,
    height: 30,
    backgroundColor: "#6CACE4",
    position: 'absolute',
    top: 7,
    borderRadius: 15
  },
  inactiveBlock: {
    display: "none",
    width: 50,
    height: 30,
    backgroundColor: "#6CACE4",
    position: 'absolute',
    top: 7,
    borderRadius: 15
  }
});
