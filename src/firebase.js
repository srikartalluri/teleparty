import { initializeApp } from "firebase/app";
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

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
