import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuuetHxnENlq__GF7hNgohL4iZd1wYNmY",
  authDomain: "react-task-instagram.firebaseapp.com",
  projectId: "react-task-instagram",
  storageBucket: "react-task-instagram.appspot.com",
  messagingSenderId: "997758284032",
  appId: "1:997758284032:web:a304bc3046e51d725c83e5",
  measurementId: "G-DXXM0H0X11"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export {app, auth, firestore, storage}