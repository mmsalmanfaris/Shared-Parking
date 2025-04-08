import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCk_Y8ND1U6goZav8RqbP2cAGKFKL0IV-o",
    authDomain: "final-project-5c102.firebaseapp.com",
    databaseURL: "https://final-project-5c102-default-rtdb.firebaseio.com",
    projectId: "final-project-5c102",
    storageBucket: "final-project-5c102.firebasestorage.app",
    messagingSenderId: "349218025261",
    appId: "1:349218025261:web:4e04d1413560a69a06ada4"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword };