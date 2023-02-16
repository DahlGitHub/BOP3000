// Import the functions you need from the SDKs you need
import{ GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail, signOut} from "firebase/auth";
import {getFirestore, query, getDocs,collection,where,addDoc} from "firebase/firestore";
import "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
import { initializeApp, getApp } from "firebase/app";

function initializeAppIfNecessary() {
  try {
    return getApp();
  } catch (any) {
  const firebaseConfig = {
    apiKey: "AIzaSyCq3uvuimLnuVrF-f3f1VaN3VD5qip2ChQ",
    authDomain: "hexacore-1c84b.firebaseapp.com",
    projectId: "hexacore-1c84b",
    storageBucket: "hexacore-1c84b.appspot.com",
    messagingSenderId: "1090430226645",
    appId: "1:1090430226645:web:b14a47eaf66fc1e9fc525c",
    databaseURL: "https://hexacore-1c84b-default-rtdb.europe-west1.firebasedatabase.app/",
  };

  return initializeApp(firebaseConfig);
  }
}

const app = initializeAppIfNecessary();
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
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
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithMicrosoft = async () => {
  try {
    const res = await signInWithPopup(auth, microsoftProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "microsoft",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const registerWithEmailAndPassword = async (firstName,lastName, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      firstName,
      lastName,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logout = () => {
  signOut(auth);
};

export {auth, db, sendPasswordReset, logInWithEmailAndPassword, signInWithGoogle, signInWithMicrosoft, registerWithEmailAndPassword, logout, app, database}