// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdzUyT0jHRaXNvgbT9nphWhWi_OXGZ284",
  authDomain: "nav-bar-ae6af.firebaseapp.com",
  projectId: "nav-bar-ae6af",
  storageBucket: "nav-bar-ae6af.appspot.com",
  messagingSenderId: "308411866235",
  appId: "1:308411866235:web:bdb4b661c3e664737916de",
  measurementId: "G-5LYP35806N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app