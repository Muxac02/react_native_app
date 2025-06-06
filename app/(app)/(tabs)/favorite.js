import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import RecordCard from "@/components/RecordCard";
import { useFavoriteRecords } from "@/contexts/FavoriteRecordsContext";
import { useRecords } from "@/contexts/RecordsContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Favorite() {
  const { user } = useAuth();
  const { recordsFavorite, loadingFavorite, errorFavorite, fetchRecords } =
    useFavoriteRecords();
  const { records, loading, error, changeStatus, refreshRecords } =
    useRecords();
  const RecordsCardList = (records) => {
    return records.map((record) => {
      if (recordsFavorite.includes(record.number))
        return (
          <RecordCard
            data={record}
            key={record.number}
            changeStatus={changeStatus}
            loading={loading}
          />
        );
    });
  };
  const br = "\n";
  if (error || errorFavorite) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.recordsList}
          refreshControl={
            <RefreshControl
              refreshing={loading || loadingFavorite}
              onRefresh={() => {
                fetchRecords(user.number);
                refreshRecords();
              }}
            />
          }
        >
          <Text style={styles.errorText}>
            Ошибка при загрузке данных:{br}
            {error} {errorFavorite}
            Проверьте подключение к внутренней сети предприятия
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.recordsList}
        refreshControl={
          <RefreshControl
            refreshing={loading || loadingFavorite}
            onRefresh={() => {
              fetchRecords(user.number);
              refreshRecords();
            }}
          />
        }
      >
        {(loading || loadingFavorite) && <ActivityIndicator size="large" />}
        {RecordsCardList(records)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  recordsList: {
    flex: 1,
    backgroundColor: "rgba(127, 127, 127, 0.4)",
  },
  errorText: {
    fontSize: 18,
    margin: 16,
    color: "rgb(63, 0, 0)",
  },
});
