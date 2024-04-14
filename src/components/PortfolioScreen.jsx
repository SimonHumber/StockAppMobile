import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Ticker from "./Ticker";
import { useSelector } from "react-redux";
import favoriteEndpoint from "../endpoints/favoriteEndpoint";

const PortfolioScreen = ({ navigation }) => {
  const [saved, setSaved] = useState([]);
  const loggedIn = useSelector((state) => {
    return state.jwt;
  });
  const fetchData = async () => {
    try {
      if (loggedIn) {
        const data = await favoriteEndpoint();
        setSaved(data.data);
      } else {
        setSaved([]);
      }
    } catch (err) {
      console.log(err);
      setSaved([]);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refresh = () => {
    fetchData();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refreshButton} onPress={refresh}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {saved.length > 0 ? (
          saved.map((symbol, index) => (
            <Ticker
              key={index}
              symbol={symbol}
              navigation={navigation}
            ></Ticker>
          ))
        ) : (
          <Text style={styles.placeholderText}>
            Save stocks to see them here!
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333", // Light shade of black
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  refreshButton: {
    backgroundColor: "#4caf50", // Green color for button
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white", // Set font color to white
    textAlign: "center",
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "white", // Set font color to white
  },
});

export default PortfolioScreen;
