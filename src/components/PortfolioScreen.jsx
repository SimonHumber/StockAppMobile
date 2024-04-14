import React, { useEffect, useState } from "react";
import { View, Button, TextInput, Text, ScrollView } from "react-native";
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
  console.log(saved);
  return (
    <View>
      <Button onPress={refresh} title="Refresh" />
      {saved.length > 0 ? (
        saved.map((result, index) => (
          <Ticker
            key={index}
            symbol={saved[index]}
            navigation={navigation}
          ></Ticker>
        ))
      ) : (
        <Text>Save stocks to see them here!</Text>
      )}
    </View>
  );
};

export default PortfolioScreen;
