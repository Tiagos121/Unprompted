import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAtyyagLzVh1Npii1AfziVRNVDoW5dQbyc",
  authDomain: "urwell-arg.firebaseapp.com",
  projectId: "urwell-arg",
  storageBucket: "urwell-arg.firebasestorage.app",
  messagingSenderId: "170305860787",
  appId: "1:170305860787:web:0289a46c5ed8157ce4acc6",
  measurementId: "G-3QW7Y8V2QL"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);