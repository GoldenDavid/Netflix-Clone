import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDwj2gP61YZpUReUPTCSO3ksLsPRrsutHE",
  authDomain: "netflix-396df.firebaseapp.com",
  projectId: "netflix-396df",
  storageBucket: "netflix-396df.appspot.com",
  messagingSenderId: "1068929004201",
  appId: "1:1068929004201:web:6a1e2c5f5e289fa206efb8",
  measurementId: "G-NZC6H0TNFD",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
