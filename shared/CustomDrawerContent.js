// CustomDrawerContent.js
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import Restart from "react-native-restart";
import { firebase } from "./firebase";
import "firebase/storage";

const CustomDrawerContent = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [showLoading, setShowLoading] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;

    if (user) {
      const userUID = user.uid;
      const usersRef = firebase.firestore().collection("users").doc(userUID);

      setShowLoading(true);

      usersRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const { name, email, position } = doc.data();
            setUserData({ name, email });

            // Check if the user has admin position
            if (position === "admin") {
              setShowAccountSettings(true);
            }
          }
        })
        .catch((error) => {
          console.error("Error retrieving user data:", error);
        })
        .finally(() => {
          setShowLoading(false);
        });
    } else {
      setUserData({ name: "Guest User", email: "guestuser@example.com" });
      setShowLoading(false);
    }
  }, []);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                Restart.Restart();
              })
              .catch((error) => {
                console.error("Error signing out:", error);
              });
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/AccountLogo.png")}
          style={styles.image}
        />
        <Text style={styles.text}>
          <Text style={styles.userName}>
            {showLoading ? "Loading..." : userData.name}
          </Text>
          {"\n"}
          <Text style={styles.userEmail}>
            {showLoading ? "Loading..." : userData.email}
          </Text>
        </Text>
      </View>

      <View style={styles.body}>
        <Pressable
          onPress={() => navigateToScreen("HomeScreen")}
          style={({ pressed }) => [
            styles.drawerItem,
            pressed ? { backgroundColor: "#4E96A9" } : null,
          ]}
        >
          <Text style={styles.drawerItemText}>Home</Text>
        </Pressable>
        <Pressable
          onPress={() => navigateToScreen("RealTimeMonitoring")}
          style={({ pressed }) => [
            styles.drawerItem,
            pressed ? { backgroundColor: "#4E96A9" } : null,
          ]}
        >
          <Text style={styles.drawerItemText}>Real-Time Monitoring</Text>
        </Pressable>
        <Pressable
          onPress={() => navigateToScreen("DataAnalysis")}
          style={({ pressed }) => [
            styles.drawerItem,
            pressed ? { backgroundColor: "#4E96A9" } : null,
          ]}
        >
          <Text style={styles.drawerItemText}>Data Analysis</Text>
        </Pressable>
      </View>

      <View style={styles.bottomContainer}>
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <View style={styles.logoutItem}>
            <Icon name="logout" size={30} color="#900" />
            <Text style={styles.drawerItemText}>Logout</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 16,
    borderWidth: 3,
    borderColor: "#7BAA13",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  text: {
    flexWrap: "wrap",
    maxWidth: 175,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
  },
  drawerItem: {
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#4E96A9",
    padding: 20,
    borderRadius: 5,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  drawerItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  body: {
    marginTop: 20,
  },
  indicatorContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default CustomDrawerContent;
