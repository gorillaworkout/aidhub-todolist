// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth,GoogleAuthProvider,} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBAQr8W3hz9DghUhU40PHWp6exjXgoaGxI",
  authDomain: "logkar-21e21.firebaseapp.com",
  projectId: "logkar-21e21",
  storageBucket: "logkar-21e21.appspot.com",
  messagingSenderId: "161749582435",
  appId: "1:161749582435:web:f6bd6f5e7468a042bc6e56"
};

firebase.initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()

export const db = getFirestore(app)
  

  