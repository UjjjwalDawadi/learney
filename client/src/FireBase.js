// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC5KtoFe32dYgkNon2Zd1Ptc595zMDlkOY",
  authDomain: "learney-5188d.firebaseapp.com",
  projectId: "learney-5188d",
  storageBucket: "learney-5188d.appspot.com",
  messagingSenderId: "241086508524",
  appId: "1:241086508524:web:a66cf09629ba4b9a8d24c9",
  measurementId: "G-VJWMSHSK4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);