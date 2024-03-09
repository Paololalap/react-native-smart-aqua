// App.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Alert } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import Navigator from './routes/MainDrawer';
import LoginScreen from './screens/LoginScreen';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import axios from 'axios';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    const intervalId = setInterval(() => {
      schedulePushNotification();
    }, 15 * 60 * 1000); 

    return () => clearInterval(intervalId);
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get(
        "https://lspu.edu.ph/e-sentry/api/public/Arduino/joyparam"
      );
      return response.data[0]; // Assuming the API returns an array and you want the first entry
    } catch (error) {
      console.error('Error fetching data from API:', error);
      return null;
    }
  };

  const schedulePushNotification = async () => {
    try {
      const apiData = await fetchDataFromAPI();

      if (apiData) {
        const { temp, ph, do: dissolvedOxygen, turbidity } = apiData;

        const tempCategory = determineTemperatureCategory(temp);
        const phCategory = determinePHCategory(ph);
        const doCategory = determineDOCategory(dissolvedOxygen);
        const turbidityCategory = determineTurbidityCategory(turbidity);

        const notificationBody =
          buildNotificationBody(temp, tempCategory, 'Temperature') +
          buildNotificationBody(ph, phCategory, 'PH') +
          buildNotificationBody(dissolvedOxygen, doCategory, 'Dissolved Oxygen') +
          buildNotificationBody(turbidity, turbidityCategory, 'Turbidity');

        // Check if all categories are 'Normal' before scheduling a notification
        if (tempCategory !== 'Normal' || phCategory !== 'Normal' || doCategory !== 'Normal' || turbidityCategory !== 'Normal') {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Anomalies Detected",
              body: notificationBody,
              data: { data: 'goes here' },
            },
            trigger: { seconds: 2 },
          });
        }
      } else {
        Alert.alert('Failed to fetch data from the API.');
      }
    } catch (error) {
      console.error('Error scheduling notification:', error);
      Alert.alert('Failed to schedule notification.');
    }
  };

  const buildNotificationBody = (value, category, parameter) => {
    return category !== 'Normal' ? `${parameter}: ${value} (${category})\n` : '';
  };

  const determineTemperatureCategory = (temp) => {
    if (temp < 27) return 'Low';
    if (temp >= 27 && temp <= 32) return 'Normal';
    if (temp > 33) return 'High';
  };

  const determinePHCategory = (ph) => {
    if (ph < 7) return 'Acidic';
    if (ph >= 7 && ph <= 9) return 'Normal';
    if (ph > 9) return 'Base';
  };

  const determineDOCategory = (doValue) => {
    if (doValue < 3) return 'Bad';
    if (doValue >= 3 && doValue <= 6) return 'Normal';
    if (doValue > 6) return 'Good';
  };

  const determineTurbidityCategory = (turbidity) => {
    if (turbidity < 1) return 'Very Low';
    if (turbidity >= 1 && turbidity <= 30) return 'Low';
    if (turbidity >= 31 && turbidity <= 60) return 'Normal';
    if (turbidity >= 61 && turbidity <= 90) return 'High';
    if (turbidity > 90) return 'Very High';
  };

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      Alert.alert('Must use a physical device for Push Notifications');
    }

    return token;
  };

  return (
    <View style={{ flex: 1 }}>
      {showSplash ? (
        <SplashScreen />
      ) : loggedIn ? (
        <Navigator />
      ) : (
        <View style={{ flex: 1 }}>
          <LoginScreen
            onLoginSuccess={() => setLoggedIn(true)}
            onGuestUser={() => setLoggedIn(true)}
            expoPushToken={expoPushToken}
            notification={notification}
          />
          {notification && (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {/* You can customize the view for displaying additional notification content */}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
