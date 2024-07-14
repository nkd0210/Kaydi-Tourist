// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kaydi-tourist-1b669.firebaseapp.com",
  projectId: "kaydi-tourist-1b669",
  storageBucket: "kaydi-tourist-1b669.appspot.com",
  messagingSenderId: "530461694790",
  appId: "1:530461694790:web:b9b5ecde990e636b91e347",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
