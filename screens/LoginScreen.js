// LoginScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  Pressable, 
  ActivityIndicator,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { firebase } from "../shared/firebase";

export default function LoginScreen({
  onLoginSuccess,
  onGuestUser,
}) {
  const [email, setEmail] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [indicatorColor, setIndicatorColor] = useState("#4E96A9");
  const [showIndicator, setShowIndicator] = useState(false);
  const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(false);

  const closeModal = () => {
    setResetPasswordModalVisible(false);
    setModalEmail("");
  };

  const forgetPassword = () => {
    setResetPasswordModalVisible(true);
  };

  const isEmailValid = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email || modalEmail);
  };

  useEffect(() => {
    const colorToggle = setInterval(() => {
      setIndicatorColor((prevColor) =>
        prevColor === "#4E96A9" ? "#7BAA13" : "#4E96A9"
      );
    }, 200);

    return () => clearInterval(colorToggle);
  }, []);

  const resetPassword = () => {
    if (modalEmail.trim() === "") {
      Alert.alert("Empty Fields", "Please fill in all fields.", [
        {
          text: "Ok",
          style: "destructive",
          onPress: () => {
            setModalEmail("");
          },
        },
      ]);
      return;
    }
    if (!isEmailValid()) {
      Alert.alert("Invalid Email!", "Please input a proper email.", [
        {
          text: "Ok",
          style: "destructive",
          onPress: () => {
            setModalEmail("");
          },
        },
      ]);
      return;
    }

    Keyboard.dismiss();

    firebase
      .auth()
      .sendPasswordResetEmail(modalEmail)
      .then(() => {
        Alert.alert("Password Reset Email", "Password reset email sent successfully!", [
          {
            style: "destructive",
          },
        ]);
        closeModal();
        return;
      })
      .catch((error) => {
        Alert.alert("Password reset failed", error.message);
      });
  };

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Empty Fields", "Please fill in all fields.", [
        {
          text: "Ok",
          style: "destructive",
          onPress: () => {
            setEmail("");
            setPassword("");
          },
        },
      ]);
      return;
    }

    if (!isEmailValid()) {
      Alert.alert("Invalid Email!", "Please input a proper email.", [
        {
          text: "Ok",
          style: "destructive",
          onPress: () => {
            setEmail("");
            setPassword("");
          },
        },
      ]);
      return;
    }

    setShowIndicator(true);
    Keyboard.dismiss();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setShowIndicator(false);
      onLoginSuccess();
    } catch (error) {
      setShowIndicator(false);
      Alert.alert("Login Failed!", "Email or Password are incorrect.", [
        {
          text: "Ok",
          style: "destructive",
          onPress: () => {
            setEmail("");
            setPassword("");
          },
        },
      ]);
    }
  };

  const handleGuestUser = () => {
    onGuestUser();
  };

  const resetPasswordForm = (
    <Modal
      transparent={true}
      animationType="fade"
      visible={resetPasswordModalVisible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.text}>Reset Password</Text>
            <TextInput
              value={modalEmail}
              onChangeText={(newEmail) => setModalEmail(newEmail)}
              style={styles.input}
              placeholder="Enter Email"
              autoCapitalize="none"
            />
            <Pressable onPress={resetPassword} style={({ pressed }) => [
              styles.resetButton,
              { backgroundColor: pressed ? 'rgba(78, 150, 169, 0.7)' : '#4E96A9' }, 
            ]}>
              <Text style={styles.buttonText}>Reset</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 200, height: 200, resizeMode: "contain" }}
          />
        </View>
      <Text style={styles.text}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={(email) => setEmail(email)}
        style={styles.input}
        placeholder="Enter Email"
        autoCapitalize="none"
      />
      <Text style={styles.text}>Password:</Text>
      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        style={styles.input}
        secureTextEntry={true}
        placeholder="Enter Password"
        autoCapitalize="none"
      />
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleLogin} style={({ pressed }) => [
          styles.loginButton,
          { backgroundColor: pressed ? 'rgba(78, 150, 169, 0.7)' : '#4E96A9' },
        ]}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
        <Pressable onPress={handleGuestUser} style={({ pressed }) => [
          styles.registerButton,
          { backgroundColor: pressed ? 'rgba(123, 170, 19, 0.7)' : '#7BAA13' },
        ]}>
          <Text style={styles.buttonText}>Login as Guest</Text>
        </Pressable>
      </View>
      <Pressable onPress={forgetPassword}>
        <Text style={[styles.text, { marginTop: 10 }]}>Forget Password?</Text>
      </Pressable>

      {resetPasswordForm}

      {showIndicator && (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={75} color={indicatorColor} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginTop: -100,
  },
  input: {
    width: "70%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
  },
  button: {
    width: "40%",
  },
  registerButton: {
    backgroundColor: "#7BAA13",
    padding: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: "#4E96A9",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  indicatorContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#4E96A9",
    padding: 10,
    borderRadius: 5,
  },
});
