import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import Navigator from './routes/MainDrawer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegisterScreen, setShowRegisterScreen] = useState(false);
  const [pressedBackButton, setPressedBackButton] = useState(false);

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

  const handleRegisterSuccess = () => {
    setShowRegisterScreen(false);
  };

  const handlePressedBackButton = () => {
    setPressedBackButton(true);
    setShowRegisterScreen(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {showSplash ? (
        <SplashScreen />
      ) : loggedIn ? (
        <Navigator />
      ) : showRegisterScreen ? (
        <RegisterScreen 
          onRegisterSuccess={handleRegisterSuccess} 
          onPressedBackButton={handlePressedBackButton} 
        />
      ) : (
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          onGuestUser={handleGuestUser}
          onRegisterSuccess={() => setShowRegisterScreen(true)}
        />
      )}
    </View>
  );
}
