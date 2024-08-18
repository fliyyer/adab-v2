import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3klbRAwYxEN5iKwBg3aYU3JvEOsbxGD8",
  authDomain: "adab-1826a.firebaseapp.com",
  projectId: "adab-1826a",
  storageBucket: "adab-1826a.appspot.com",
  messagingSenderId: "24634489456",
  appId: "1:24634489456:web:8ee02f9b454bfbf7ab52b5"
  
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
const auth = getAuth(app);
export { auth };
