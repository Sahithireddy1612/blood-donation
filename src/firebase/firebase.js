import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA4ez85BuLTVuwtA3zaiGFjTDLVJYFoHE0",
  authDomain: "blood-donation-17001.firebaseapp.com",
  projectId: "blood-donation-17001",
  storageBucket: "blood-donation-17001.appspot.com",
  messagingSenderId: "1007141747130",
  appId: "1:1007141747130:web:bc2f184a786482bdb18583",
  measurementId: "G-6ZRECG7KQT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
