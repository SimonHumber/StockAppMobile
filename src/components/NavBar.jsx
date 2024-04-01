import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Register" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
