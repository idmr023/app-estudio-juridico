// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMWFyHRrX-047PHGfKrraWf2urMAbjAv4",
  authDomain: "proyabogado.firebaseapp.com",
  projectId: "proyabogado",
  storageBucket: "proyabogado.firebasestorage.app",
  messagingSenderId: "869322358693",
  appId: "1:869322358693:web:87a8c877c61b3f8c43724c",
  measurementId: "G-HNVRRX7238"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);