
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAquPRr_xQ925eZL-ga9m7AvBIFyS8--BA",
  authDomain: "recruitingsite-512b3.firebaseapp.com",
  projectId: "recruitingsite-512b3",
  storageBucket: "recruitingsite-512b3.appspot.com",
  messagingSenderId: "102204045229",
  appId: "1:102204045229:web:541f092028caf4ed725324"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);