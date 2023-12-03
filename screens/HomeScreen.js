import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

export default function App() {
  const [showImage] = useState(true);
  const [parameterData, setParameterData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/Arduino/joyparam');
        setParameterData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const firstEntry = parameterData?.length > 0 ? parameterData[0] : null;

  function getStatusForTemperature(temp) {
    if (temp < 27) return 'Low';
    if (temp >= 27 && temp <= 32) return 'Normal';
    if (temp > 33) return 'High';
  }

  function getStatusForPH(ph) {
    if (ph < 5.6) return 'Acidic';
    if (ph >= 5.6 && ph <= 6.4) return 'Normal';
    if (ph > 6.4) return 'Base';
  }

  function getStatusForDO(doValue) {
    if (doValue < 3) return 'Bad';
    if (doValue >= 3 && doValue < 6) return 'Normal';
    if (doValue >= 6 && doValue < 9) return 'Very Good';
    if (doValue >= 9) return 'Very Good';
  }

  function getStatusForTurbidity(turbidity) {
    if (turbidity < 1) return 'Very Low';
    if (turbidity >= 1 && turbidity <= 30) return 'Low';
    if (turbidity > 30 && turbidity <= 60) return 'Normal';
    if (turbidity > 60 && turbidity <= 90) return 'High';
    if (turbidity > 90) return 'Very High';
  }

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
        <View style={[styles.box, styles.notificationContainer]}>
          <View>
            <Text style={styles.notificationsHeader}>Notifications</Text>
          </View>
          <View style={{ width: '90%', marginBottom: 25 }}>
            {getStatusForTemperature(parseFloat(firstEntry?.temp)) !== 'Normal' && (
              <Text style={styles.notificationText}>
                Temperature: {' '}{getStatusForTemperature(parseFloat(firstEntry?.temp))}
              </Text>
            )}
            {getStatusForPH(parseFloat(firstEntry?.ph)) !== 'Normal' && (
              <Text style={styles.notificationText}>
                pH: {' '}{getStatusForPH(parseFloat(firstEntry?.ph))}
              </Text>
            )}
            {getStatusForDO(parseFloat(firstEntry?.do)) !== 'Normal' || getStatusForDO(parseFloat(firstEntry?.do)) !== 'Good' && (
              <Text style={styles.notificationText}>
                Dissolved Oxygen: {' '}{getStatusForDO(parseFloat(firstEntry?.do))}
              </Text>
            )}
            {getStatusForTurbidity(parseFloat(firstEntry?.turbidity)) !== 'Low' || getStatusForTurbidity(parseFloat(firstEntry?.turbidity)) !== 'Normal' || getStatusForTurbidity(parseFloat(firstEntry?.turbidity)) !== 'High' && (
              <Text style={styles.notificationText}>
                Turbidity: {' '}{getStatusForTurbidity(parseFloat(firstEntry?.turbidity))}
              </Text>
            )}
          </View>
        </View>
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
  notificationContainer: {
    borderColor: '#4E96A9',
    height: 'auto',
    justifyContent: 'flex-start',
  },
  notificationText: {
    fontSize: 16,
    marginVertical: 2,
    fontWeight: 'bold',
  },
  notificationsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
  },
});
