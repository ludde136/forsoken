import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJMkQ3HXHSpb3HS1kjLeG1SqLZRc1e7qQ",
  authDomain: "nettside-e597d.firebaseapp.com",
  projectId: "nettside-e597d",
  storageBucket: "nettside-e597d.firebasestorage.app",
  messagingSenderId: "1052507919580",
  appId: "1:1052507919580:web:bcbf87b11132a5a5cbd019",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
