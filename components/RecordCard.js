import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useCountdown } from "../hooks/useCountDown";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons/";
import { useRouter } from "expo-router";
import { HoldItem } from "react-native-hold-menu";
import { useSelect } from "@/contexts/SelectContext";
import { useFavoriteRecords } from "@/contexts/FavoriteRecordsContext";
import { useAuth } from "@/contexts/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";

export default function RecordCard(props) {
  const { user } = useAuth();
  const { recordsFavorite, addFavorite, deleteFavorite, loadingFavorite } =
    useFavoriteRecords();
  const { ships, ports } = useSelect();
  const router = useRouter();
  const data = props.data;
  const arrive_date = new Date(data.arrive_date);
  const sail_date = new Date(data.sail_date);
  const arrive_date_real = data.arrive_date_real
    ? new Date(data.arrive_date_real)
    : "null";
  const sail_date_real = data.sail_date_real
    ? new Date(data.sail_date_real)
    : "null";
  const current_date = Date.now();
  const arrive_status =
    arrive_date_real == "null" && arrive_date > current_date
      ? "default"
      : arrive_date_real == "null" && arrive_date <= current_date
      ? "gettingLate"
      : arrive_date_real != "null" && arrive_date_real <= arrive_date
      ? "inTime"
      : arrive_date_real != "null" && arrive_date_real > arrive_date
      ? "late"
      : "default";
  const sail_status =
    sail_date_real == "null" && sail_date > current_date
      ? "default"
      : sail_date_real == "null" && sail_date <= current_date
      ? "gettingLate"
      : sail_date_real != "null" && sail_date_real <= sail_date
      ? "inTime"
      : sail_date_real != "null" && sail_date_real > sail_date
      ? "late"
      : "default";
  const lateColor = "rgba(191, 0, 0, 0.9)";
  const gettingLateColor = "#FF0000";
  const inTimeColor = "#00E000";
  const declOfNum = (n, titles) => {
    return titles[
      n % 10 === 1 && n % 100 !== 11
        ? 0
        : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
        ? 1
        : 2
    ];
  };
  const countDownTimer = (date, status, real_date) => {
    const [days, hours, minutes] = useCountdown(date, current_date, real_date);
    const diff = date - current_date;
    return (
      <>
        <View style={styles.contentTimeTimer}>
          <Text
            style={[
              styles.contentTimeTimerText,
              status == "default"
                ? {}
                : status == "late"
                ? { color: lateColor }
                : status == "gettingLate"
                ? { color: gettingLateColor }
                : { color: inTimeColor },
            ]}
          >
            {status != "inTime" && status != "late"
              ? diff < 0
                ? "-"
                : ""
              : ""}
            {Math.floor(days / 10) == 0 ? "0" + days.toString() : days}
          </Text>
          <Text
            style={[
              styles.contentTimeTimerTextUndertime,
              status == "default"
                ? {}
                : status == "late"
                ? { color: lateColor }
                : status == "gettingLate"
                ? { color: gettingLateColor }
                : { color: inTimeColor },
            ]}
          >
            {declOfNum(days, ["день", "дня", "дней"])}
          </Text>
        </View>
        <View>
          <Text
            style={[
              styles.contentTimeTimerText,
              status == "default"
                ? {}
                : status == "late"
                ? { color: lateColor }
                : status == "gettingLate"
                ? { color: gettingLateColor }
                : { color: inTimeColor },
            ]}
          >
            :
          </Text>
        </View>
        <View
          style={[
            styles.contentTimeTimer,
            status == "default"
              ? {}
              : status == "late"
              ? { color: lateColor }
              : status == "gettingLate"
              ? { color: gettingLateColor }
              : { color: inTimeColor },
          ]}
        >
          <Text
            style={[
              styles.contentTimeTimerText,
              status == "default"
                ? {}
                : status == "late"
                ? { color: lateColor }
                : status == "gettingLate"
                ? { color: gettingLateColor }
                : { color: inTimeColor },
            ]}
          >
            {Math.floor(hours / 10) == 0 ? "0" + hours : hours}
          </Text>
          <Text
            style={[
              styles.contentTimeTimerTextUndertime,
              status == "default"
                ? {}
                : status == "late"
                ? { color: lateColor }
                : status == "gettingLate"
                ? { color: gettingLateColor }
                : { color: inTimeColor },
            ]}
          >
            {declOfNum(hours, ["час", "часа", "часов"])}
          </Text>
        </View>
        <View>
          <Text
            style={[
              styles.contentTimeTimerText,
              status == "default"
                ? {}
                : status == "late"
                ? { color: lateColor }
                : status == "gettingLate"
                ? { color: gettingLateColor }
                : { color: inTimeColor },
            ]}
          >
            :
          </Text>
        </View>
        <View style={styles.contentTimeTimer}>
          <Text
            style={[
              styles.contentTimeTimerText,
              status == "default"
                ? {}
                : status == "late"
                ? { color: lateColor }
                : status == "gettingLate"
                ? { color: gettingLateColor }
                : { color: inTimeColor },
            ]}
          >
            {Math.floor(minutes / 10) == 0 ? "0" + minutes : minutes}
          </Text>
          <Text
            style={[
              styles.contentTimeTimerTextUndertime,
              status == "default"
                ? {}
                : status == "late"
                ? { color: lateColor }
                : status == "gettingLate"
                ? { color: gettingLateColor }
                : { color: inTimeColor },
            ]}
          >
            {declOfNum(minutes, ["минута", "минуты", "минут"])}
          </Text>
        </View>
      </>
    );
  };
  const arriveButtonDisabled = data.arrive_date_real ? true : false;
  const sailButtonDisabled = data.sail_date_real
    ? true
    : arriveButtonDisabled
    ? false
    : true;
  const archived = data.sail_date_real
    ? Math.abs(sail_date_real.getTime() - current_date) >=
      7 * 24 * 60 * 60 * 1000
    : false;

  return (
    <HoldItem
      items={[
        { text: "Действие", isTitle: true, onPress: () => {} },
        {
          text: "Пришел в порт",
          isDestructive: arriveButtonDisabled,
          onPress: () => {
            if (arriveButtonDisabled) {
              Alert.alert(
                "Внимание",
                "Судно уже пришло",
                [
                  {
                    text: "Ок",
                  },
                ],
                { cancelable: true }
              );
              return;
            }
            console.log(`arrive record ${data.number}`);
            props.changeStatus(data.number);
          },
        },
        {
          text: "Ушел в рейс",
          withSeparator: true,
          isDestructive: sailButtonDisabled,
          onPress: () => {
            if (sailButtonDisabled) {
              Alert.alert(
                "Внимание",
                arriveButtonDisabled ? "Судно уже ушло" : "Судно ещё не пришло",
                [
                  {
                    text: "Ок",
                  },
                ],
                { cancelable: true }
              );
              return;
            }
            console.log(`sail record ${data.number}`);
            props.changeStatus(data.number);
          },
        },
        {
          text: "Редактировать",
          onPress: () => {
            console.log(`change record ${data.number}`);
            router.push({
              pathname: "/record/[id]/update",
              params: {
                id: data.number,
              },
            });
          },
        },
      ]}
      hapticFeedback="Light"
      closeOnTap
    >
      <TouchableHighlight
        underlayColor="#6CACE4"
        style={styles.container}
        onPress={() => {
          router.push({
            pathname: "/record/[id]",
            params: {
              id: data.number,
            },
          });
        }}
        key={data.number}
        disabled={props.loading}
      >
        <View>
          <View
            style={[
              styles.head,
              { paddingBottom: archived ? 16 : 4, paddingRight: 8 },
            ]}
          >
            <TouchableOpacity
              style={{ position: "absolute", right: -6, top: -6 }}
              onPress={() => {
                if (recordsFavorite.includes(data.number)) {
                  deleteFavorite(user.number, data.number);
                } else {
                  addFavorite(user.number, data.number);
                }
              }}
              disabled={loadingFavorite}
            >
              {loadingFavorite ? (
                <ActivityIndicator />
              ) : (
                <MaterialIcons
                  name={
                    recordsFavorite.includes(data.number)
                      ? "star"
                      : "star-border"
                  }
                  size={24}
                  color={
                    recordsFavorite.includes(data.number)
                      ? "rgb(245, 229, 84)"
                      : "black"
                  }
                />
              )}
            </TouchableOpacity>
            <View style={styles.headShip}>
              <FontAwesome6 name="ship" color={textColor} size={28} />
              <Text style={styles.headText}>
                {ships.find((s) => s.number == data.ship).name}
              </Text>
            </View>
            <View style={styles.headPort}>
              <FontAwesome name="anchor" color={textColor} size={28} />
              <Text style={styles.headText}>
                {ports.find((s) => s.number == data.port).name}
              </Text>
            </View>
          </View>
          {archived && (
            <Text
              style={{
                color: textColor,
                fontWeight: "bold",
                position: "absolute",
                top: 28,
              }}
            >
              В архиве
            </Text>
          )}
          <View style={styles.contentFront}>
            <View style={styles.contentDate}>
              <Text style={styles.contentDateText}>До прибытия в порт</Text>
              <Text style={styles.contentDateText}>
                {arrive_date.toLocaleString()}
              </Text>
            </View>
            <View style={styles.contentTime}>
              {countDownTimer(arrive_date, arrive_status, arrive_date_real)}
            </View>
          </View>
          <View style={styles.contentBack}>
            <View style={styles.contentDate}>
              <Text style={styles.contentDateText}>До ухода в рейс</Text>
              <Text style={styles.contentDateText}>
                {sail_date.toLocaleString()}
              </Text>
            </View>
            <View style={styles.contentTime}>
              {countDownTimer(sail_date, sail_status, sail_date_real)}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </HoldItem>
  );
}

const textColor = "#333333";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 8,
    margin: 4,
    marginHorizontal: 12,
    boxShadow: "0 4 6.7 0 rgba(0, 0, 0, 0.25)",
  },
  head: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(127, 127, 127, 0.4)",
    paddingBottom: 4,
  },
  headShip: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
  },
  headPort: {
    flexDirection: "row",
    alignItems: "center",
    width: "25%",
  },
  headText: {
    fontSize: 24,
    fontWeight: 600,
    marginLeft: 4,
    color: textColor,
    top: 2,
  },
  content: {},
  contentFront: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentBack: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentDate: {
    justifyContent: "space-between",
  },
  contentDateText: {
    color: textColor,
    fontSize: 16,
  },
  contentTime: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  contentTimeTimer: {
    alignItems: "center",
  },
  contentTimeTimerText: {
    fontSize: 32,
    color: textColor,
    lineHeight: 36,
  },
  contentTimeTimerTextUndertime: {
    fontSize: 12,
    color: textColor,
    lineHeight: 12,
  },
});
