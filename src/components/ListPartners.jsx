import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  TextInput,
  Text,
  Modal,
  ScrollView,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import userDataEndpoint from "../endpoints/userDataEndpoint";
import addPartnerEndpoint from "../endpoints/addPartnerEndpoint";
import removePartnerEndpoint from "../endpoints/removePartnerEndpoint";
import { AntDesign } from "@expo/vector-icons";

const PartnerCard = ({ partner, fetchData, navigation }) => {
  const removePartner = async () => {
    try {
      const data = await removePartnerEndpoint(partner);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };
  const handlePress = () => {
    navigation.navigate("PartnerPorfolio", { partner });
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
      <Text style={styles.partnerText}>{partner}</Text>
      <Pressable onPress={removePartner}>
        <AntDesign name="minuscircleo" size={24} color="#333333" />
      </Pressable>
    </TouchableOpacity>
  );
};
export default function ListPartners({ navigation }) {
  const [addModal, setAddModal] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [partnerError, setPartnerError] = useState("");
  const [partners, setPartners] = useState([]);
  const fetchData = async () => {
    try {
      const data = await userDataEndpoint();
      setPartners(data.data.partners);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const addPartner = async () => {
    try {
      const data = await addPartnerEndpoint(partnerName);
      if (data.response && data.response.status) {
        setPartnerError(data.response.data.message);
      } else {
        setPartnerError("");
        fetchData();
        setAddModal(false);
      }
    } catch (err) {
      setPartnerError("Error adding partner.");

      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addPartnerButton}
        title="Add partner"
        onPress={() => {
          setAddModal(true);
        }}
      >
        <Text style={styles.buttonText}>Add partner</Text>
      </TouchableOpacity>
      <ScrollView>
        {partners.length > 0 ? (
          partners.map((result, index) => (
            <PartnerCard
              key={index}
              partner={partners[index]}
              fetchData={fetchData}
              navigation={navigation}
            />
          ))
        ) : (
          <Text style={styles.placeholderText}>
            Add partners to see them here!
          </Text>
        )}
      </ScrollView>
      <Modal animationType="slide" visible={addModal}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Partner username"
            onChangeText={(value) => {
              setPartnerName(value);
            }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => setAddModal(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={addPartner}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.errorText}>{partnerError}</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    padding: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  partnerText: {
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#333333", // Light shade of black
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#ced4da", // Input border color
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#ffffff", // White background color for input
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  addPartnerButton: {
    backgroundColor: "#4caf50", // Green color for button
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  errorText: {
    color: "#ff0000", // Error text color
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white", // Set font color to white
    textAlign: "center",
  },
  touchableOpacity: {
    backgroundColor: "#4caf50",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
});
