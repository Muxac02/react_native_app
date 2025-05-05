import { StyleSheet, Text, SafeAreaView} from 'react-native';

export default function Add() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Add</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
