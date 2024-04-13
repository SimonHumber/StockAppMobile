import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import axios from "axios";
import stockEndpoint from "../endpoints/stockEndpoint";

const StockScreen = ({ navigation, symbol }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await stockEndpoint(symbol);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  return (
    <View>
      <Text>Stock screen</Text>
    </View>
  );
};
export default StockScreen;
