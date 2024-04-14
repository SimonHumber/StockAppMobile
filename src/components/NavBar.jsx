import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import PortfolioScreen from "./PortfolioScreen";
import SearchScreen from "./SearchScreen";
import StockScreen from "./StockScreen";
import LoginScreen from "./LoginScreen";
import ProfileScreen from "./ProfileScreen";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function NavBar() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Back"
          component={Nav}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Stock" component={StockScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Nav = () => {
  const loggedIn = useSelector((state) => {
    return state.jwt != "";
  });
  const stateScreen = loggedIn ? ProfileScreen : LoginScreen;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#999",
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabIcon,
      }}
    >
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarIcon: () => (
            <AntDesign name="staro" size={28} style={styles.icon} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: () => (
            <AntDesign name="search1" size={28} style={styles.icon} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={stateScreen}
        options={{
          tabBarIcon: () => (
            <AntDesign name="user" size={28} style={styles.icon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    elevation: 10,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  tabIcon: {
    fontSize: 24,
    color: "#007bff",
  },
});
