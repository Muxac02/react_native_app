import { StatusBar } from 'expo-status-bar' ;
import * as NavigationBar from 'expo-navigation-bar';
import { useState } from 'react';
import { StyleSheet, Text, Button, SafeAreaView, Image, StatusBar as StBar ,View} from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  const br = '\n';
  NavigationBar.setBackgroundColorAsync("#025EA1");
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' backgroundColor='#025EA1'/>
      <Header icon={"Search"} title={"График судов"}/>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: '#ff0',
    paddingTop: StBar.currentHeight
  }
});
