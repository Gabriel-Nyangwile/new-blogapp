
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzQvizdH6Vadkx7g-lyKXUMr0VIrRL1_A",
  authDomain: "premier-app-485e4.firebaseapp.com",
  projectId: "premier-app-485e4",
  storageBucket: "premier-app-485e4.appspot.com",
  messagingSenderId: "779194129102",
  appId: "1:779194129102:web:4c6a32f6ebfcff40d0ce9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

