import React, { useEffect, useState } from "react";
import { View, Button, TextInput } from "react-native";

const [query, setQuery] = useState("");

useEffect(() => {}, [query]);

export default function SearchScreen({ navigation }) {
  return (
    <View>
      <TextInput onChangeText={setQuery} />
    </View>
  );
}
