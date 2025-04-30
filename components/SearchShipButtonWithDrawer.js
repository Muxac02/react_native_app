import { Text, View, Image, StyleSheet } from 'react-native'
import Search from "../assets/Search.svg"

export default function SearchShipButtonWithDrawer(props) {
    return (
      <View style={styles.icon}>
        <Search width={24} height={24}/>
      </View>
      );
    }

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    margin: 12
  }
});
