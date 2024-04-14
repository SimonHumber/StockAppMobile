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
    <TouchableOpacity
      onPress={handlePress}
      style={{ flexDirection: "row", justifyContent: "space-between" }}
    >
      <Text>{partner}</Text>
      <Pressable onPress={removePartner}>
        <AntDesign name="minuscircleo" size={24} color="black" />
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
    <View>
      <Button
        title="Add partner"
        onPress={() => {
          setAddModal(true);
        }}
      />
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
          <Text>Add partners to see them here!</Text>
        )}
      </ScrollView>
      <Modal animationType="slide" visible={addModal}>
        <TextInput
          placeholder="Partner username"
          onChangeText={(value) => {
            setPartnerName(value);
          }}
        />
        <Button title="Add" onPress={addPartner} />
        <Button title="Cancel" onPress={() => setAddModal(false)} />
        <Text>{partnerError}</Text>
      </Modal>
    </View>
  );
}
