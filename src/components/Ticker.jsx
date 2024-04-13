import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";

const Ticker = ({ index, symbol, navigation }) => {
  const handlePress = () => {
    navigation.navigate("Stock", { symbol });
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Text key={index}>{symbol}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "80%",
    height: 70,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 5,
    backgroundColor: "grey",
  },
});
export default Ticker;
