import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import Navigator from './routes/MainDrawer';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const handleGuestUser = () => {
    setLoggedIn(true);
  }

  return (
    <View style={{ flex: 1 }}>
  {showSplash ? (
    <SplashScreen />
  ) : loggedIn ? (
    <Navigator />
  ) : (
    <LoginScreen
      onLoginSuccess={handleLoginSuccess}
      onGuestUser={handleGuestUser}
    />
  )}
</View>

  );
}
