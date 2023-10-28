import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';

export default function App() {
  const [showImage, setShowImage] = useState(true);
  const [indicatorColor, setIndicatorColor] = useState('#4E96A9');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowImage(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const colorToggle = setInterval(() => {         //blue       //green
      setIndicatorColor(prevColor => prevColor === '#4E96A9' ? '#7BAA13' : '#4E96A9');
    }, 200); 

    return () => clearInterval(colorToggle);
  }, []);

  return (
    <View style={styles.container}>
      {showImage ? (
        <Image
          source={require('.././assets/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <>
          <StatusBar style="auto" />
        </>
      )}
      {showImage ? (
        <ActivityIndicator size={50} color={indicatorColor} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
