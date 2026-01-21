// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "red-network-90896.firebaseapp.com",
  projectId: "red-network-90896",
  storageBucket: "red-network-90896.appspot.com",
  messagingSenderId: "990707138029",
  appId: "1:990707138029:web:4d3ee9f0fc7904dbe07be4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;