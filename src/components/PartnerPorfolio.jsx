import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ticker from "./Ticker";
import partnerFavEndpoint from "../endpoints/partnerFavEndpoint";

const PartnerPorfolio = ({ route, navigation }) => {
  partner = route.params.partner;
  const [saved, setSaved] = useState([]);
  const fetchData = async () => {
    try {
      const data = await partnerFavEndpoint(partner);
      if (data.data.length > 0) {
        setSaved(data.data);
      } else {
        setSaved([]);
      }
    } catch (err) {
      // console.log(err);
      setSaved([]);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {saved.length > 0 ? (
        saved.map((result, index) => (
          <Ticker
            key={index}
            symbol={saved[index]}
            navigation={navigation}
          ></Ticker>
        ))
      ) : (
        <Text style={styles.placeholderText}>Partner has no stocks!</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333", // Light shade of black
    paddingHorizontal: 20,
    paddingTop: 20,
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
export default PartnerPorfolio;
