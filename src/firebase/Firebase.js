// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ_yTBhZvM5kIfnw7rqkqjd_kkUo6Kcqw",
  authDomain: "filmy-world-007.firebaseapp.com",
  projectId: "filmy-world-007",
  storageBucket: "filmy-world-007.appspot.com",
  messagingSenderId: "989109780391",
  appId: "1:989109780391:web:071f8475941edb7aedc082"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const movieRef = collection(db,"movies")
export const reviewRef = collection(db,"reviews")
export const userRef = collection(db,"user")
export default app