import React, { useEffect, useState } from "react";
import { View, Button, TextInput, Text } from "react-native";
import { useSelector } from "react-redux";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  useEffect(() => {}, [query]);
  return (
    <View>
      <TextInput onChangeText={setQuery} />
    </View>
  );
}
