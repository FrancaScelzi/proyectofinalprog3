import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAeAVHuR-Ou2vh1ILWcmvEsxZriEPt6b3s",
  authDomain: "prog-3-rn-6d281.firebaseapp.com",
  projectId: "prog-3-rn-6d281",
  storageBucket: "prog-3-rn-6d281.appspot.com",
  messagingSenderId: "346845465223",
  appId: "1:346845465223:web:89aeb13d2818d595fdc622"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();