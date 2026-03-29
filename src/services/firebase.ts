import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrYywtTJYG1dJdpwMQVQEy6nNw98vzNdA",
  authDomain: "hota-creatives.firebaseapp.com",
  projectId: "hota-creatives",
  storageBucket: "hota-creatives.firebasestorage.app",
  messagingSenderId: "376861675756",
  appId: "1:376861675756:web:d610c170580e680f4f55c9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
