import { Platform } from "react-native";
const domain = Platform.OS == "ios" ? "localhost" : "10.0.2.2";

export default domain;
