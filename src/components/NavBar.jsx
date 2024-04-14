import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import PortfolioScreen from "./PortfolioScreen";
import SearchScreen from "./SearchScreen";
import StockScreen from "./StockScreen";
import LoginScreen from "./LoginScreen";
import ProfileScreen from "./ProfileScreen";

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
    <Tab.Navigator>
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={stateScreen} />
    </Tab.Navigator>
  );
};
