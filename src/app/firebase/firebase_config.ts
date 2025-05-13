import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import {FirebaseApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBfLuGRIEqjVtgXLtqjGv0VsuFF7SBp2Lg",
  authDomain: "fitnova-e3e7d.firebaseapp.com",
  projectId: "fitnova-e3e7d",
  storageBucket: "fitnova-e3e7d.firebasestorage.app",
  messagingSenderId: "855047493750",
  appId: "1:855047493750:web:44852d2673b84ab1e8a757",
  measurementId: "G-YFXS1NCMQQ"
};

const app:FirebaseApp = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const db = getFirestore(app);

