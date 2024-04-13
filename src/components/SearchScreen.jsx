import React, { useState } from "react";
import { View, Button, TextInput, Text, ScrollView } from "react-native";
import searchEndpoint from "../endpoints/searchEndpoint";
import Ticker from "./Ticker";

//TODO fix search when query is cleared
export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const handlePress = async () => {
    try {
      var searchResults = await searchEndpoint(query);
      setResults(searchResults.data.result);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <View>
      <TextInput
        onChangeText={(value) => setQuery(value)}
        placeholder="Search"
      />
      <Button title="Search" onPress={handlePress} />
      <ScrollView>
        {results && results.length > 0 ? (
          results.map((result, index) => (
            <Ticker
              key={index}
              symbol={result.symbol}
              navigation={navigation}
            ></Ticker>
          ))
        ) : (
          <Text>Search for a symbol!</Text>
        )}
      </ScrollView>
    </View>
  );
}
