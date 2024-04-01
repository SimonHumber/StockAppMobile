import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import { Formik, ErrorMessage } from "formik";
import testEndpoint from "../endpoints/testEndpoint";
import registerEndpoint from "../endpoints/registerEndpoint";
import RegisterScreen from "./RegisterScreen";

export default function LoginScreen({ navigation }) {
  const [errorMessage, setErrorMessage] = useState("");
  const loginForm = {
    userName: "",
    password: "",
  };

  const loginSubmit = async (form) => {
    try {
      await testEndpoint();
      const registered = await registerEndpoint(form);
      console.log("here");
      registered.form
        ? setErrorMessage(registered.message)
        : setErrorMessage(registered.message);
    } catch (error) {
      console.error("Error connecting to server");
    }
  };

  return (
    <>
      <Formik initialValues={loginForm} onSubmit={loginSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values: form }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("userName")}
              onBlur={handleBlur("userName")}
              value={form.userName}
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
            <Button onPress={loginSubmit} title="Submit" />
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
