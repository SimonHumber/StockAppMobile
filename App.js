import { Provider } from "react-redux";
import store from "./src/redux/store";
import { StyleSheet } from "react-native";
import NavBar from "./src/components/NavBar";

export default function App() {
  return (
    <Provider store={store}>
      <NavBar />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
