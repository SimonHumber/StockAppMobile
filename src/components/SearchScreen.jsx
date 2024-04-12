import React, { useEffect, useState } from "react";
import { View, Button, TextInput, Text } from "react-native";
import searchEndpoint from "../endpoints/searchEndpoint";

//TODO fix search when query is cleared
export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => {
    const postData = async () => {
      try {
        if (query.length > 0) {
          var searchResults = await searchEndpoint(query);
          setResults(searchResults.data.result);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    postData();
  }, [query]);
  return (
    <View>
      <TextInput
        onChangeText={(value) => setQuery(value)}
        placeholder="Search"
      />
      {results.length > 0 ? (
        results.map((result, index) => <Text key={index}>{result.symbol}</Text>)
      ) : (
        <Text>Search for a symbol!</Text>
      )}
    </View>
  );
}
