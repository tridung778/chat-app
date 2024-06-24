// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDENNpzjcXF6f4cJkCTQj0rtrNwTdlV_KQ",
  authDomain: "whatsapp-clone-a0f24.firebaseapp.com",
  projectId: "whatsapp-clone-a0f24",
  storageBucket: "whatsapp-clone-a0f24.appspot.com",
  messagingSenderId: "658879439929",
  appId: "1:658879439929:web:189a1ad88e9a1f96ed19e8",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };
