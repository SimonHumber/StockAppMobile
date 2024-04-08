import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./LoginScreen";
import ProfileScreen from "./ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import SearchScreen from "./SearchScreen";

const Tab = createBottomTabNavigator();

export default function NavBar() {
  const isLogged = useSelector((state) => {
    return state.jwt.length > 0;
  });
  const stateScreen = isLogged ? ProfileScreen : LoginScreen;

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Portfolio" component={SearchScreen} />
        <Tab.Screen name="Profile" component={stateScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
