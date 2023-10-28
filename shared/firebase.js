import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/storage';
// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGRyiEO7SYZbUboxHck1WC_vT5vJSkxrQ",
  authDomain: "smartaquapp-c46e9.firebaseapp.com",
  databaseURL: "https://smartaquapp-c46e9-default-rtdb.firebaseio.com",
  projectId: "smartaquapp-c46e9",
  storageBucket: "smartaquapp-c46e9.appspot.com",
  messagingSenderId: "466977767127",
  appId: "1:466977767127:web:075488324609f429153a92",
  measurementId: "G-E9KSEQM203"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export { firebase };