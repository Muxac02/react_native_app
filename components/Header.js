import { Text, View, Image, StyleSheet } from 'react-native'
import SearchShipButtonWithDrawer from './SearchShipButtonWithDrawer';

export default function Header(props) {
    return (
      <View style={styles.container}>
        <SearchShipButtonWithDrawer/>
        <Text style={styles.title}> {props.title} </Text>
        <Image source={require(`../assets/Avatar.png`)} style={styles.icon}/>
      </View>
      );
    }

const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FEF7FF",
    width: "100%",
    height: 48
  },
  icon: {
    width: 24,
    height: 24,
    margin: 12
  },
    title: {
      fontSize: 22
  }
});
