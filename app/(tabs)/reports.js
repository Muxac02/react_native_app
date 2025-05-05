import { StyleSheet, Text, SafeAreaView} from 'react-native';

export default function Reports() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>reports</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
