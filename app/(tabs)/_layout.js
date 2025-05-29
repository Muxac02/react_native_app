import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons, Fontisto } from "@expo/vector-icons";
import { View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import Header from "../../components/Header";

export default function TabLayout() {
  NavigationBar.setBackgroundColorAsync("#025EA1");
  return (
    <Tabs
      screenOptions={{
        header: (props) => (
          <Header title={props.options.title} params={props.route.params} />
        ),
        animation: "shift",
        tabBarActiveTintColor: "#fff",
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarInactiveTintColor: "#6CACE4",
        tabBarStyle: {
          height: 64,
          backgroundColor: "#025EA1",
        },
        tabBarItemStyle: {
          height: 64,
        },
        tabBarLabelStyle: {
          marginTop: 8,
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "График",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={activeIconStyle}>
                <MaterialIcons name="schedule" color={color} size={28} />
              </View>
            ) : (
              <MaterialIcons name="schedule" color={color} size={28} />
            ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Избранное",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={activeIconStyle}>
                <Fontisto name="favorite" color={color} size={24} />
              </View>
            ) : (
              <Fontisto name="favorite" color={color} size={24} />
            ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Добавить",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={activeIconStyle}>
                <Ionicons name="add" color={color} size={32} />
              </View>
            ) : (
              <Ionicons name="add" color={color} size={32} />
            ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Отчеты",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={activeIconStyle}>
                <Ionicons name="archive" color={color} size={24} />
              </View>
            ) : (
              <Ionicons name="archive" color={color} size={24} />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          href: null,
          animation: "none",
        }}
      />
      <Tabs.Screen
        name="record/[id]/index"
        options={{
          title: "Запись №",
          href: null,
          animation: "none",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Поиск",
          href: null,
          animation: "none",
        }}
      />
      <Tabs.Screen
        name="report/[id]/index"
        options={{
          title: "Отчет №",
          href: null,
          animation: "none",
        }}
      />
      <Tabs.Screen
        name="report/addReport"
        options={{
          title: "Создание отчета",
          href: null,
          animation: "none",
        }}
      />
    </Tabs>
  );
}

const activeIconStyle = {
  backgroundColor: "#6CACE4",
  borderRadius: 16,
  height: 32,
  width: 52,
  alignItems: "center",
  justifyContent: "center",
};
