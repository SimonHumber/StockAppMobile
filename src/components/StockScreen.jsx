import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import axios from "axios";
import stockEndpoint from "../endpoints/stockEndpoint";

const StockScreen = ({ route, navigation }) => {
  const [stockData, setStockData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { symbol } = route.params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await stockEndpoint(symbol);
        setStockData(data.data);
      } catch (err) {
        setErrorMessage(err.response.data.errorMessage);
      }
    };
    fetchData();
  }, []);
  return (
    <View>
      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <>
          <Text>{stockData.name}</Text>
          <Text>{stockData.ticker}</Text>
          <Text>{stockData.country}</Text>
          <Text>{stockData.currency}</Text>
          <Text>{stockData.exchange}</Text>
          <Text>Industry: {stockData.finnhubIndustry}</Text>
          <Text>IPO: {stockData.ipo}</Text>
          <Text>URL: {stockData.weburl}</Text>
          <Image
            source={{
              uri: stockData.logo,
            }}
            style={{ height: 40, width: 40 }}
          />
        </>
      )}
    </View>
  );
};
export default StockScreen;
