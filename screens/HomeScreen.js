// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function App() {
  const [showImage] = useState(true);
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.textAndImageContainer}>
          <Text style={styles.text}>
            <Text style={styles.smartText}>Smart</Text>
            <Text style={styles.aquaText}>Aqua</Text>
          </Text>
          {showImage && (
            <Image
              source={require(".././assets/logo.png")}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </View>
        <Pressable
          onPress={() => navigateToScreen('RealTimeMonitoring')}
          style={({ pressed }) => [
            styles.box,
            {
              opacity: pressed ? 0.7 : 1, // Change opacity on press
            },
          ]}>
          <View style={styles.iconAndText}>
            <Icon name="dashboard" size={35} color="#4E96A9" />
            <Text style={styles.labelText}>Real-Time Monitoring</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigateToScreen('DataAnalysis')}
          style={({ pressed }) => [
            styles.box,
            {
              opacity: pressed ? 0.7 : 1, // Change opacity on press
            },
          ]}>
          <View style={styles.iconAndText}>
            <Icon name="linechart" size={35} color="#4E96A9" />
            <Text style={styles.labelText}>Data Analysis</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    position: "relative",
  },
  textAndImageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  smartText: {
    color: "#7BAA13",
  },
  aquaText: {
    color: "#4E96A9",
  },
  image: {
    width: 200,
    height: 200,
  },
  box: {
    width: '90%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#7baa13',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    minHeight: 120,
  },
  labelText: {
    fontSize: 16,
    color: "#000",
  },
  iconAndText: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
