import React, { useState } from "react";
import { View, Button, TextInput, Text, ScrollView } from "react-native";
import Ticker from "./Ticker";
import { useDispatch, useSelector } from "react-redux";
import savedEndpoint from "../endpoints/savedEndpoint";

const PortfolioScreen = ({ navigation }) => {
  const [saved, setSaved] = useState([]);
  const loggedIn = useSelector((state) => {
    return state.jwt;
  });
  if (loggedIn) {
    // setSaved(savedEndpoint());
  }
  return (
    <View>
      {loggedIn ? (
        saved.map((result, index) => (
          <Ticker key={index} symbol={result.symbol}></Ticker>
        ))
      ) : (
        <Text>Log in to save your investments!</Text>
      )}
    </View>
  );
};

export default PortfolioScreen;
