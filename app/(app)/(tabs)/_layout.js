import { Tabs } from "expo-router";
import { Stack } from "expo-router/stack";
import { Ionicons, MaterialIcons, Fontisto } from "@expo/vector-icons";
import { View } from "react-native";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";

export default function TabLayout() {
  const { authenticated, user } = useAuth();
  if (!authenticated) {
    return <Redirect href="/sign-in" />;
  }
  const getPermissionByName = (name) => {
    switch (user.role) {
      case "admin":
        if (name == "admin") return name;
        break;
      case "department_worker":
        if (["reports", "report/addReport"].includes(name)) return name;
        break;
      case "dispatcher":
        if (["admin", "report/addReport"].includes(name)) return null;
        return name;
      default:
        return null;
    }
    return null;
  };
  return (
    <Tabs
      backBehavior="history"
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
          href: getPermissionByName(""),
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
          href: getPermissionByName("favorite"),
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
          href: getPermissionByName("add"),
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
          href: getPermissionByName("reports"),
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
        name="report/[id]/update"
        options={{
          title: "Редактировать отчет №",
          href: null,
          animation: "none",
        }}
      />
      <Tabs.Screen
        name="record/[id]/update"
        options={{
          title: "Редактировать запись №",
          href: null,
          animation: "none",
        }}
      />
      <Tabs.Screen
        name="report/addReport"
        options={{
          href: getPermissionByName("report/addReport"),
          title: "Создание отчета",
          animation: "none",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={activeIconStyle}>
                <MaterialIcons name="add" color={color} size={28} />
              </View>
            ) : (
              <MaterialIcons name="add" color={color} size={28} />
            ),
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          href: getPermissionByName("admin"),
          title: "Администрирование",
          animation: "none",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={activeIconStyle}>
                <MaterialIcons
                  name="admin-panel-settings"
                  color={color}
                  size={28}
                />
              </View>
            ) : (
              <MaterialIcons
                name="admin-panel-settings"
                color={color}
                size={28}
              />
            ),
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
