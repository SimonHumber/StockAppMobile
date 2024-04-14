import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import favoriteEndpoint from "../endpoints/favoriteEndpoint";
import toggleFavEndpoint from "../endpoints/toggleFavEndpoint";
import { useEffect, useState } from "react";

const Ticker = ({ index, symbol, navigation }) => {
  const [favorite, setFavorite] = useState(false);
  const handlePress = () => {
    navigation.navigate("Stock", { symbol });
  };
  const loggedIn = useSelector((state) => {
    return state.jwt != "";
  });
  const toggleFavorite = async () => {
    try {
      await toggleFavEndpoint(symbol);
      const data = await favoriteEndpoint(symbol);
      setFavorite(data.data.includes(symbol));
    } catch (err) {
      setFavorite(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData = async () => {
      try {
        if (loggedIn) {
          const data = await favoriteEndpoint(symbol);
          setFavorite(data.data.includes(symbol));
        } else {
          setFavorite(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    //when searching for new symbol, ticker is re-rendered, not unmounted
    //use symbol as dependency so when symbol is updated, will re-render useEffect
  }, [symbol, loggedIn]);
  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Text style={styles.symbol}>{symbol}</Text>
      <TouchableOpacity onPress={toggleFavorite}>
        {favorite ? (
          <AntDesign name="star" size={30} color="gold" />
        ) : (
          <AntDesign name="staro" size={30} color="gold" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 70,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  symbol: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
export default Ticker;
