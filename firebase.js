// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxDuiN-IhuSs5u-38P2uUnR7A4sjaZTOI",
    authDomain: "majorprojectcarwash.firebaseapp.com",
    projectId: "majorprojectcarwash",
    storageBucket: "majorprojectcarwash.appspot.com",
    messagingSenderId: "429589755715",
    appId: "1:429589755715:web:49d33be0f2563cc5b9a1f6"
};
let app = null;

if (app == null) {
    app = initializeApp(firebaseConfig);
}


export const db = getFirestore(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});