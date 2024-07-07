// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCaU8J-DeTzvKduBHGsTIfmqceyvBLHqYc",
    authDomain: "jewelry-shop-9b1ff.firebaseapp.com",
    projectId: "jewelry-shop-9b1ff",
    storageBucket: "jewelry-shop-9b1ff.appspot.com",
    messagingSenderId: "648689996425",
    appId: "1:648689996425:web:74f43632184311f801ec58",
    measurementId: "G-C4XSRVSR3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
