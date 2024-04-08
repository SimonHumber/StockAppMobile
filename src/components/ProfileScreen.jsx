import React, { useEffect, useState } from "react";
import { View, Button, TextInput, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { jwtDelete } from "../redux/slice";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.jwt;
  });
  const handlePress = () => {
    dispatch(jwtDelete());
    navigation.navigate("Profile");
  };
  return (
    <View>
      <Text>JWT: {token}</Text>
      <Button title="Log out" onPress={handlePress} />
    </View>
  );
}
