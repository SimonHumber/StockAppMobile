import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from "react-native";
import axios from "axios";
import stockEndpoint from "../endpoints/stockEndpoint";

const StockScreen = ({ route, navigation }) => {
  const [stockData, setStockData] = useState({});
  const [stockNews, setStockNews] = useState([]);
  const [stockValue, setStockValue] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { symbol } = route.params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await stockEndpoint(symbol);
        setStockData(data.data.companyProfile);
        setStockNews(data.data.companyNews);
        setStockValue(data.data.companyValue);
        // console.log(data.data.companyValue.metric["13WeekPriceReturnDaily"]);
      } catch (err) {
        setErrorMessage(err.response.data.errorMessage);
      }
    };
    fetchData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        <View>
          <View style={{ alignItems: "center" }}>
            <Image source={{ uri: stockData.logo }} style={styles.logo} />
          </View>
          <View>
            <Text style={styles.title}>{stockData.name}</Text>
            <Text style={styles.info}>
              13 Week Return:{" "}
              {stockValue &&
                stockValue.metric &&
                stockValue.metric["13WeekPriceReturnDaily"]}
            </Text>
            <Text style={styles.info}>Ticker: {stockData.ticker}</Text>
            <Text style={styles.info}>Country: {stockData.country}</Text>
            <Text style={styles.info}>Currency: {stockData.currency}</Text>
            <Text style={styles.info}>Exchange: {stockData.exchange}</Text>
            <Text style={styles.info}>
              Industry: {stockData.finnhubIndustry}
            </Text>
            <Text style={styles.info}>IPO: {stockData.ipo}</Text>
            <Text style={styles.info}>URL: {stockData.weburl}</Text>
          </View>
        </View>
      )}
      {errorMessage ? (
        <></>
      ) : (
        stockNews.map((item, index) => (
          <View key={index} style={styles.newsCard}>
            <Text style={styles.newsTitle}>{item.headline}</Text>
            <Text style={styles.newsSummary}>{item.summary}</Text>
            <Text style={styles.newsSource}>Source: {item.source}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#333333", // Background color
  },
  errorMessage: {
    color: "#ff0000", // Error text color
    fontSize: 18,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff", // Text color
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    color: "#ffffff", // Text color
  },
  logo: {
    height: 400,
    width: 400,
  },
  newsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  newsSummary: {
    fontSize: 16,
    marginBottom: 5,
  },
  newsSource: {
    fontSize: 14,
    color: "#666666",
  },
});

export default StockScreen;
