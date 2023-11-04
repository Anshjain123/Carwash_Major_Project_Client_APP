// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAm6tXaiikbPNMV-CFUAr0TxbWbXZWYpv0",
    authDomain: "carwashmajorproject.firebaseapp.com",
    databaseURL: "https://carwashmajorproject-default-rtdb.firebaseio.com",
    projectId: "carwashmajorproject",
    storageBucket: "carwashmajorproject.appspot.com",
    messagingSenderId: "606965000934",
    appId: "1:606965000934:web:1ba99440f676be2a3a2927"
};


let app = null;

if (app == null) {
    app = initializeApp(firebaseConfig);
}


export const db = getFirestore(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});