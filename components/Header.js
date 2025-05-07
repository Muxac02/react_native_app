import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Header(props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#025EA1" translucent={false} />
      <TouchableHighlight
        onPress={() => {
          setOpen(true);
        }}
      >
        <Image source={require(`../assets/omni.jpg`)} style={styles.icon} />
      </TouchableHighlight>
      <Drawer
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        size="lg"
        anchor="top"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <Text>Heading</Text>
          </DrawerHeader>
          <DrawerBody></DrawerBody>
          <DrawerFooter>
            <TouchableHighlight
              onPress={() => {
                setOpen(false);
              }}
            >
              <Text>Hello</Text>
            </TouchableHighlight>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Text style={styles.title}>
        {" "}
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
