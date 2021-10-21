import firebase from 'firebase';
import app from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCJqiWwpiep8tYvFndtXKHCE-oMozaJnyo",
  authDomain: "proyectofinalprog3.firebaseapp.com",
  projectId: "proyectofinalprog3",
  storageBucket: "proyectofinalprog3.appspot.com",
  messagingSenderId: "149487737555",
  appId: "1:149487737555:web:38de359d320816b8a11226"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
