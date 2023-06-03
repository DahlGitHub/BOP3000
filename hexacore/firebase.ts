// Import the functions you need from the SDKs you need
import{ GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail, signOut} from "firebase/auth";
import {getFirestore, query, getDocs,collection,where,addDoc, doc, setDoc} from "firebase/firestore";
import { getDatabase } from "firebase/database";
import "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

function initializeAppIfNecessary() {
  try {
    return getApp();
  } catch (any) {
    const firebaseConfig = {
      apiKey: "AIzaSyD31ttqwr4HO1tMeuZhtORfMKn4VW-9KGM",
      authDomain: "hexacore-1c84b.firebaseapp.com",
      databaseURL: "https://hexacore-1c84b-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "hexacore-1c84b",
      storageBucket: "hexacore-1c84b.appspot.com",
      messagingSenderId: "1090430226645",
      appId: "1:1090430226645:web:b14a47eaf66fc1e9fc525c"
    };

    return initializeApp(firebaseConfig);
  }
}



// Initialize Firebase
const app = initializeAppIfNecessary();

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

const microsoftProvider = new firebase.auth.OAuthProvider("microsoft.com");
microsoftProvider.setCustomParameters({
  prompt: "consent",
  tenant: "52c4340a-af1c-4010-b7e4-08e63d51696f"
})




const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {

  }
};

const signInWithMicrosoft = async () => {
  try {
    const res = await signInWithPopup(auth, microsoftProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "microsoft",
        email: user.email,
      });
    }
  } catch (err) {

  }
}

const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {

    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email: user.email,
    });
  } catch (err) {

  }
};

//endre melding til sjekk mailen din om du har fått melding hvis ikke sjekk om du har skrevet riktig mail.
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {

  }
};


const logout = () => {
  signOut(auth);
};

export {auth, db, sendPasswordReset, logInWithEmailAndPassword, signInWithGoogle, signInWithMicrosoft, registerWithEmailAndPassword, logout, app, database, storage}