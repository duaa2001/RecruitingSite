import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  apiKey: "AIzaSyAquPRr_xQ925eZL-ga9m7AvBIFyS8--BA",
  authDomain: "recruitingsite-512b3.firebaseapp.com",
  databaseURL: "https://recruitingsite-512b3-default-rtdb.firebaseio.com",
  projectId: "recruitingsite-512b3",
  storageBucket: "recruitingsite-512b3.appspot.com",
  messagingSenderId: "102204045229",
  appId: "1:102204045229:web:541f092028caf4ed725324"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);