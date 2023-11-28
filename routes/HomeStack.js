import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import RealTimeMonitoring from '../screens/RealTimeMonitoring';
import About from '../screens/AboutScreen';
import DataAnalysis from '../screens/DataAnalysis';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home Screen', 
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RealTimeMonitoring"
        component={RealTimeMonitoring}
        options={{
          title: 'Real-time Monitoring', 
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: 'About', 
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DataAnalysis"
        component={DataAnalysis}
        options={{
          title: 'Data Analysis', 
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
