import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

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
export const db = getFirestore(app);

if (window.location.hostname === "localhost") {
  console.log("Modo de desarrollo: Conectando a los Emuladores de Firebase...");
  
  // Conecta al emulador de Firestore
  connectFirestoreEmulator(db, 'localhost', 8080);
  
  // Conecta al emulador de Autenticación
  connectAuthEmulator(auth, 'http://localhost:9099');
}