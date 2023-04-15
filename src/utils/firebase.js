// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { TwitterAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1llg3iGsfmR-FqFnICAZf2gI7V1USyT4",
  authDomain: "incentiveinc-d9f4f.firebaseapp.com",
  projectId: "incentiveinc-d9f4f",
  storageBucket: "incentiveinc-d9f4f.appspot.com",
  messagingSenderId: "1042009288016",
  appId: "1:1042009288016:web:cf03f1c78d8810fcb89055",
  measurementId: "G-RGSJPDBK8Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const Provider = new TwitterAuthProvider();
const db = getFirestore(app);

export { auth, Provider, db };
