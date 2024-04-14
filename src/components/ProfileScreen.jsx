import React, { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import userDataEndpoint from "../endpoints/userDataEndpoint";
import { jwtDelete } from "../redux/slice";
import { useDispatch } from "react-redux";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const fetchData = async () => {
    try {
      const data = await userDataEndpoint();
      setUser(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleLogout = () => {
    dispatch(jwtDelete());
    navigation.navigate("Profile");
  };
  const partnerView = () => {
    navigation.navigate("ListPartners");
  };
  return (
    <View>
      <Text>Welcome {user.firstName}!</Text>
      <Button title="View Partners" onPress={partnerView} />
      <Button title="Log out" onPress={handleLogout} />
    </View>
  );
}
