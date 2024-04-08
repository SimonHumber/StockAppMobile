import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import { Formik, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import RegisterScreen from "./RegisterScreen";
import axios from "axios";
import domain from "../endpoints/domain";
import { jwtUpdate } from "../redux/slice";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const loginForm = {
    username: "",
    password: "",
  };

  const loginSubmit = async (form) => {
    try {
      const response = await axios.post(`http://${domain}:4000/login`, form);
      const token = response.data;
      dispatch(jwtUpdate(token));
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
          <View style={styles.form}>
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
            <Button onPress={handleSubmit} title="Submit" />
            <Text>{errorMessage}</Text>
          </View>
        )}
      </Formik>
      <RegisterScreen />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "lightgrey",
    marginTop: 5,
    marginBottom: 5,
    width: "50%",
  },
  form: {
    alignItems: "center",
  },
});
