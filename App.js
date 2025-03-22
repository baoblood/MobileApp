import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Import các màn hình từ folder screens
import CalendarScreen from "./src/CalendarScreen";
import SettingScreen from "./src/SettingScreen";

// Tạo Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Lịch") {
              iconName = "calendar";
            } else if (route.name === "Cài Đặt") {
              iconName = "settings";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Lịch" component={CalendarScreen} />
        <Tab.Screen name="Cài Đặt" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
