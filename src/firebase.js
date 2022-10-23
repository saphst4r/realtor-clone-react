// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-XVb9Xh1xpcRvGEbIlKuBdfScfyZaD3Y",
  authDomain: "realtor-clone-react-ecf39.firebaseapp.com",
  projectId: "realtor-clone-react-ecf39",
  storageBucket: "realtor-clone-react-ecf39.appspot.com",
  messagingSenderId: "348457733394",
  appId: "1:348457733394:web:61dd3ae6b606ca920477cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();