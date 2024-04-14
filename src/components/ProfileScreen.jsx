import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import userDataEndpoint from "../endpoints/userDataEndpoint";
import { jwtDelete } from "../redux/slice";
import { useDispatch } from "react-redux";

const ProfileScreen = ({ navigation }) => {
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
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {user.firstName}!</Text>
      <TouchableOpacity style={styles.button} onPress={partnerView}>
        <Text style={styles.buttonText}>View Partners</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333333", // Light shade of black
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white", // Set font color to white
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4caf50", // Green color for buttons
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white", // Set font color to white
    textAlign: "center",
  },
});
export default ProfileScreen;
