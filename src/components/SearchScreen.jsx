import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
} from "react-native";
import searchEndpoint from "../endpoints/searchEndpoint";
import Ticker from "./Ticker";

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const handlePress = async () => {
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
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setQuery(value)}
        value={query}
        placeholder="Search"
        placeholderTextColor="#6c757d"
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {results && results.length > 0 ? (
          results.map((result, index) => (
            <Ticker
              key={index}
              symbol={result.symbol}
              navigation={navigation}
            />
          ))
        ) : (
          <Text style={styles.placeholderText}>Search for a symbol!</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333", // Light shade of black
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    height: 40,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "white",
    color: "black",
  },
  button: {
    backgroundColor: "#4caf50",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "white",
  },
});
export default SearchScreen;
