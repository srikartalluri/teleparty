import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCz8rlhvYVWgkQ4KpMsDTasZxZfo-osB7o",
    authDomain: "teleparty-478509.firebaseapp.com",
    databaseURL: "https://teleparty-478509-default-rtdb.firebaseio.com/",
    projectId: "teleparty-478509",
    storageBucket: "teleparty-478509.firebasestorage.app",
    messagingSenderId: "776935957980",
    appId: "1:776935957980:web:f0d3263f364b155ced1b19"
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getDatabase(app);