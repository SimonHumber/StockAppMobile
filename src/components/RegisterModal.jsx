import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
} from "react-native";
// import Modal from "react-native-modal";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import registerEndpoint from "../endpoints/registerEndpoint";
YupPassword(Yup); //extend yup

export default function RegisterModal({ navigation }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
  const [success, setSuccess] = useState("");
  const initialForm = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be between 3-20 characters")
      .max(20, "Username must be between 3-20 characters")
      .required("Username must be between 3-20 characters"),
    firstName: Yup.string()
      .min(2, "First name must be between 2-20 characters")
      .max(20, "First name must be between 2-20 characters")
      .required("First name must be between 2-20 characters"),
    lastName: Yup.string()
      .min(2, "Last name must be between 2-20 characters")
      .max(20, "Last name must be between 2-20 characters")
      .required("Last name must be between 2-20 characters"),
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
    try {
      const response = await registerEndpoint(form);
      response.status == 200
        ? finishRegistration()
        : setErrorMessage(response.data.message);
    } catch (error) {
      setErrorMessage("Error connecting to server");
    }
  };
  const finishRegistration = () => {
    setSuccess("Reigstration successful!");
    setModalVisibility(false);
    setErrorMessage("");
  };

  return (
    <>
      <Modal
        animationType="slide"
        onRequestClose={() => setModalVisibility(false)}
        visible={modalVisibility}
      >
        <ScrollView style={styles.scrollView}>
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
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={form.username}
                  placeholder="Username"
                />
                <Text style={styles.errorText}>
                  <ErrorMessage name="username" />
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={form.firstName}
                  placeholder="First name"
                />
                <Text style={styles.errorText}>
                  <ErrorMessage name="firstName" />
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={form.lastName}
                  placeholder="Last name"
                />
                <Text style={styles.errorText}>
                  <ErrorMessage name="lastName" />
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={form.email}
                  placeholder="Email"
                />
                <Text style={styles.errorText}>
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
                <Text style={styles.errorText}>
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
                <Text style={styles.errorText}>
                  <ErrorMessage name="confirmPassword" />
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => setModalVisibility(false)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}
          </Formik>
        </ScrollView>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisibility(true)}
        style={styles.createButton}
      >
        <Text style={styles.createButtonText}>Create account</Text>
      </TouchableOpacity>
      <Text style={styles.successText}>{success}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 0,
    flex: 1,
    backgroundColor: "#333333",
  },
  input: {
    backgroundColor: "#f2f2f2",
    marginTop: 10,
    marginBottom: 5,
    width: "80%",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
  },
  form: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  createButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 20,
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "#ff0000",
    marginTop: 5,
    marginBottom: 10,
  },
  successText: {
    textAlign: "center",
    marginTop: 10,
    color: "white",
  },
});
