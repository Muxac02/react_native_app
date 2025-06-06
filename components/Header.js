import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useRouter } from "expo-router";
import RecordSearchDrawer from "./RecordSearchDrawer";
import { usePathname } from "expo-router";
import { Icon, ArrowLeftIcon, MenuIcon, AddIcon } from "@/components/ui/icon";
import AddRecordsScreenHeaderButton from "./AddRecordsScreenHeaderButton";

export default function Header(props) {
  const router = useRouter();
  const currentScreen = usePathname().split("/")[1];
  return (
    <View style={styles.container}>
      {currentScreen == "" ||
      currentScreen == "favorite" ||
      currentScreen == "search" ? (
        <RecordSearchDrawer />
      ) : currentScreen == "record" || currentScreen == "report" ? (
        <TouchableHighlight
          style={{ borderRadius: 24 }}
          underlayColor={"rgba(165, 165, 165, 0.4)"}
          onPress={() => {
            router.back();
          }}
        >
          <Icon as={ArrowLeftIcon} style={styles.icon} />
        </TouchableHighlight>
      ) : currentScreen == "reports" ? (
        <TouchableHighlight
          style={{ borderRadius: 24 }}
          underlayColor={"rgba(165, 165, 165, 0.4)"}
          onPress={() => {
            router.push("/report/addReport");
          }}
        >
          <Icon as={AddIcon} style={styles.icon} />
        </TouchableHighlight>
      ) : currentScreen == "add" ? (
        <AddRecordsScreenHeaderButton />
      ) : (
        <View style={{ width: 48 }}></View>
      )}
      <Text style={styles.title}>
        {props.title} {props.params ? props.params.id : ""}
      </Text>
      <TouchableHighlight
        style={{
          borderRadius: 24,
          backgroundColor:
            currentScreen == "profile"
              ? "rgba(165, 165, 165, 0.4)"
              : "rgba(255,255,255,0)",
        }}
        disabled={currentScreen == "profile" ? true : false}
        underlayColor={"rgba(165, 165, 165, 0.4)"}
        onPress={() => {
          router.navigate("/profile");
        }}
      >
        <Image source={require(`../assets/Avatar.png`)} style={styles.icon} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FEF7FF",
    width: "100%",
    height: 48,
  },
  icon: {
    width: 24,
    height: 24,
    margin: 12,
  },
  title: {
    fontSize: 22,
  },
});
