// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq3uvuimLnuVrF-f3f1VaN3VD5qip2ChQ",
  authDomain: "hexacore-1c84b.firebaseapp.com",
  projectId: "hexacore-1c84b",
  storageBucket: "hexacore-1c84b.appspot.com",
  messagingSenderId: "1090430226645",
  appId: "1:1090430226645:web:b14a47eaf66fc1e9fc525c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();