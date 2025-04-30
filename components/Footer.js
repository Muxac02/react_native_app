import { Text, View, Image, StyleSheet } from 'react-native'
import FooterButton from './FooterButton'
import { useState } from 'react';

export default function Footer(props) {
    const [selected, setSelected] = useState('1')
    function handleSelected(id){
        setSelected(id)
    }
    return (
      <View style={styles.footer}>
        <FooterButton title={"График"} id={"1"} selected={selected} handleSelected={handleSelected}/>
        <FooterButton title={"Избранное"} id={"2"} selected={selected} handleSelected={handleSelected}/>
        <FooterButton title={"Добавить"} id={"3"} selected={selected} handleSelected={handleSelected}/>
        <FooterButton title={"Отчеты"} id={"4"} selected={selected} handleSelected={handleSelected}/>
      </View>
      );
    }

const styles = StyleSheet.create({
  footer:{
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#025EA1",
    width: "100%",
    height: 64,
    paddingLeft: 12,
    paddingRight: 12,
  },
});
