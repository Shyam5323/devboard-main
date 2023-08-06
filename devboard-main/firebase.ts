// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpgPzeQx0YJCy-lXBJzdBxhouBu3q-2cY",
  authDomain: "devboard-e28d0.firebaseapp.com",
  projectId: "devboard-e28d0",
  storageBucket: "devboard-e28d0.appspot.com",
  messagingSenderId: "155961549948",
  appId: "1:155961549948:web:782d1c6fcbe70d6da2d5f9",
  measurementId: "G-XSLDDB1SN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

