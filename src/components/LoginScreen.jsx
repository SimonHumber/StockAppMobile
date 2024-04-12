import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import { Formik, ErrorMessage } from "formik";
import RegisterScreen from "./RegisterScreen";
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
