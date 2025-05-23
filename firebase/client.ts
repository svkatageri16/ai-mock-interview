// Import the functions you need from the SDKs you need
import { initializeApp,getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4fu7xjwraJ_XZY7oRb9im-YlSzTureCc",
    authDomain: "prepwise-1fc02.firebaseapp.com",
    projectId: "prepwise-1fc02",
    storageBucket: "prepwise-1fc02.firebasestorage.app",
    messagingSenderId: "876308729286",
    appId: "1:876308729286:web:990d48a9e78f9927aef6c7",
    measurementId: "G-XRRQ6REDB4"
};

// Initialize Firebase
const app = !getApps.length? initializeApp(firebaseConfig): getApp();
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);