import React, { useEffect, useState } from "react";
import { Button, Text, ScrollView } from "react-native";
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
  const refresh = () => {
    fetchData();
  };
  return (
    <ScrollView>
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
        <Text>Partner has no stocks!</Text>
      )}
    </ScrollView>
  );
};

export default PartnerPorfolio;
