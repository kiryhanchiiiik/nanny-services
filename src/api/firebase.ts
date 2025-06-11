import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBs0zmu27A0NWQl3BiFvlsZYU6m896OVl4",
  authDomain: "nanny-services-c6788.firebaseapp.com",
  databaseURL:
    "https://nanny-services-c6788-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nanny-services-c6788",
  storageBucket: "nanny-services-c6788.firebasestorage.app",
  messagingSenderId: "685553369435",
  appId: "1:685553369435:web:d2278d629d5577676e9a7e",
  measurementId: "G-NJ9NE6QRKF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
