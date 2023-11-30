import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert, NativeModules, ActivityIndicator, Keyboard, Pressable } from 'react-native';
import { firebase } from '../shared/firebase';

export default function RegisterScreen() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [indicatorColor, setIndicatorColor] = useState('#4E96A9');
    const [showIndicator, setShowIndicator] = useState(false);

    const isEmailValid = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    useEffect(() => {
      const colorToggle = setInterval(() => {
        setIndicatorColor(prevColor => prevColor === '#4E96A9' ? '#7BAA13' : '#4E96A9');
      }, 200);
  
      return () => clearInterval(colorToggle);
    }, []);

    const handleRegister = async () => {
      if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
        Alert.alert(
          'Empty Fields',
          'Please fill in all fields.',
          [
            {
              text: 'Ok',
              style: 'destructive',
            },
          ]
        );
        return;
      }
    
      if (!isEmailValid()) {
        Alert.alert(
          'Invalid Email!',
          'Please input a proper email.',
          [
            {
              text: 'Ok',
              style: 'destructive',
            },
          ]
        );
        return;
      }

      setShowIndicator(true);
      Keyboard.dismiss();
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        await firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: 'https://smartaquapp-c46e9.firebaseapp.com',
        });
  
        await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
          email,
          name,
        });
        
        setShowIndicator(false);
        Alert.alert(
          'Registered Successfully!',
          'You have successfully registered.',
          [
            {
              text: 'Return to Login Screen',
              onPress: () => { 
                NativeModules.DevSettings.reload();
              },
              style: 'destructive',
            },
          ]
        );
      } catch (error) {
        setShowIndicator(false);
        alert(error.message); 
      }
    };

    return (
      <View style={styles.container}>
          <View style={styles.content}>
              <View style={styles.imageContainer}>
                  <Image
                  source={require('.././assets/logo.png')}
                  style={{ width: 200, height: 200, resizeMode: 'contain' }}
                  />
              </View>
              <Text style={styles.text}>Name:</Text>
              <TextInput
                  onChangeText={(text) => setName(text)}
                  style={styles.input}
                  placeholder="Enter Name"
                  autoCapitalize="words"
              />
              <Text style={styles.text}>Email:</Text>
              <TextInput
                  onChangeText={(text) => setEmail(text)}
                  style={styles.input}
                  placeholder="Enter Email"
                  autoCapitalize="none"
              />
              <Text style={styles.text}>Password:</Text>
              <TextInput
                  onChangeText={(text) => setPassword(text)}
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Enter Password"
                  autoCapitalize='none'
              />
              <Pressable style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>REGISTER</Text>
              </Pressable>
          </View>
          {showIndicator && (
              <View style={styles.indicatorContainer}>
                  <ActivityIndicator size={75} color={indicatorColor} />
              </View>
          )}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  backButton: {
    top: 0,
    left: 0,
    padding: 15,
    position: 'absolute',
  },
  imageContainer: {
    marginTop: -100,
  },
  input: {
    width: '70%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  indicatorContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
  },
  registerButton: {
    backgroundColor: '#4E96A9',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});