import { StyleSheet, Text, SafeAreaView} from 'react-native';

export default function Favorite() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Favorite</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
