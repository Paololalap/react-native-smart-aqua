// AccountSettings.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Pressable, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AccountSettings() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Pressable onPress={handleImagePress} style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
        </Pressable>
      ) : (
        <Pressable onPress={handleImagePress} style={styles.imageContainer}>
          <Image source={require('../assets/AccountLogo.png')} style={styles.image} resizeMode="contain" />
        </Pressable>
      )}
      
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageContainer: {
    width: 125,
    height: 125,
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
