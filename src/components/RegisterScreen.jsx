import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Platform,
} from "react-native";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import axios from "axios";
import testEndpoint from "../endpoints/testEndpoint";
import registerEndpoint from "../endpoints/registerEndpoint";
YupPassword(Yup); //extend yup

export default function RegisterScreen({ navigation }) {
  const [errorMessage, setErrorMessage] = useState("");
  const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const signupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .max(20, "First name must be at least 2 characters")
      .required("First name must be at least 2 characters"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .max(20, "Last name must be at least 2 characters")
      .required("Last name must be at least 2 characters"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string()
      .min(2, "Password must be at least 8 characters")
      .max(30, "Password can be no longer than 30 characters")
      .minUppercase(1, "Password must have at least 1 uppercase")
      .minLowercase(1, "Password must have at least 1 lowercase")
      .minSymbols(1, "Password must have at least 1 symbol")
      .minNumbers(1, "Password must have at least 1 number")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .password()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Passwords must match"),
  });

  const handleSubmit = async (form) => {
    //TODO: iOS can hit endpoints but android gets network errors
    //try http://10.0.2.2 for android emulator
    try {
      // await testEndpoint();
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
    <Formik
      initialValues={initialForm}
      onSubmit={handleSubmit}
      validationSchema={signupSchema}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
    >
      {({ handleChange, handleBlur, handleSubmit, values: form }) => (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
            value={form.firstName}
            placeholder="First name"
          />
          <Text>
            <ErrorMessage name="firstName" />
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
            value={form.lastName}
            placeholder="Last name"
          />
          <Text>
            <ErrorMessage name="lastName" />
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={form.email}
            placeholder="Email"
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
          <TextInput
            style={styles.input}
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={form.confirmPassword}
            placeholder="Confirm password"
            secureTextEntry={true}
          />
          <Text>
            <ErrorMessage name="confirmPassword" />
          </Text>
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
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
