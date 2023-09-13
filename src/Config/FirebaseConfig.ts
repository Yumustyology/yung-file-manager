// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cloud-manager-firebase.firebaseapp.com",
  projectId: "cloud-manager-firebase",
  storageBucket: "cloud-manager-firebase.appspot.com",
  messagingSenderId: "878923781375",
  appId: "1:878923781375:web:97d4e59d62949dd15968ca",
  measurementId: "G-6868X04FHB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);