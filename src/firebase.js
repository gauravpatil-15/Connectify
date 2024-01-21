// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT6bGUyuE9em6HxQwA6yAFTyxppGh8srY",
  authDomain: "connectify-96d07.firebaseapp.com",
  projectId: "connectify-96d07",
  storageBucket: "connectify-96d07.appspot.com",
  messagingSenderId: "399652152594",
  appId: "1:399652152594:web:a5860d5270278849e73fcb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();