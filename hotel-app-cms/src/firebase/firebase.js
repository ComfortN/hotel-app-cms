// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCY1tOVSAe-wlbE-isbyc2z4FmaMU4dtGY",
    authDomain: "hotel-app-dbc60.firebaseapp.com",
    projectId: "hotel-app-dbc60",
    storageBucket: "hotel-app-dbc60.appspot.com",
    messagingSenderId: "931332460131",
    appId: "1:931332460131:web:21ea3374b8dbfe6897f256",
    measurementId: "G-7CMND5SSYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
const database = getFirestore(app);
const storage = getStorage(app);

export {auth, database, storage}