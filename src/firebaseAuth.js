import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCz8rlhvYVWgkQ4KpMsDTasZxZfo",
  authDomain: "teleparty-478509.firebaseapp.com",
  projectId: "teleparty-478509",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
