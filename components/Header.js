import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import RecordSearchDrawer from "./RecordSearchDrawer";
import { usePathname } from "expo-router";
import { Icon, ArrowLeftIcon, MenuIcon } from "@/components/ui/icon";

export default function Header(props) {
  const router = useRouter();
  const currentScreen = usePathname().split("/")[1];
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#025EA1" translucent={false} />
      {currentScreen == "" ||
      currentScreen == "favorite" ||
      currentScreen == "search" ? (
        <RecordSearchDrawer />
      ) : currentScreen == "record" ? (
        <TouchableHighlight
          style={{ borderRadius: 24 }}
          underlayColor={"rgba(165, 165, 165, 0.4)"}
          onPress={() => {
            router.back();
          }}
        >
          <Icon as={ArrowLeftIcon} style={styles.icon} />
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          style={{ borderRadius: 24 }}
          underlayColor={"rgba(165, 165, 165, 0.4)"}
          onPress={() => {
            console.log(`'open overlay for screen "${currentScreen}"`);
          }}
        >
          <Icon as={MenuIcon} style={styles.icon} />
        </TouchableHighlight>
      )}
      <Text style={styles.title}>
        {props.title} {props.params ? props.params.id : ""}
      </Text>
      <TouchableHighlight
        style={{ borderRadius: 24 }}
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
