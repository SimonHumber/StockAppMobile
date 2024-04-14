import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Formik, ErrorMessage } from "formik";
import RegisterModal from "./RegisterModal";
import loginEndpoint from "../endpoints/loginEndpoint";

export default function LoginScreen({ navigation }) {
  const [errorMessage, setErrorMessage] = useState("");
  const loginForm = {
    username: "",
    password: "",
  };

  const loginSubmit = async (form) => {
    try {
      loginEndpoint(form);
      navigation.navigate("Profile");
    } catch (error) {
      setErrorMessage("Login failed");
      console.log(error);
    }
  };

  return (
    <>
      <Formik initialValues={loginForm} onSubmit={loginSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values: form }) => (
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={form.username}
              placeholder="Username"
            />
            <Text>
              <ErrorMessage name="email" />
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={form.password}
              placeholder="Password"
              secureTextEntry={true}
            />
            <Text>
              <ErrorMessage name="password" />
            </Text>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <Text>{errorMessage}</Text>
            <RegisterModal />
          </View>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#f8f9fa",
    marginTop: 5,
    marginBottom: 5,
    width: "50%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#4caf50",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
