import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAVObDuqnOAXuZgPTzwiRfDoRwPV4ejTuU",
  authDomain: "react-stripe-d224f.firebaseapp.com",
  databaseURL: "https://react-stripe-d224f.firebaseio.com",
  projectId: "react-stripe-d224f",
  storageBucket: "react-stripe-d224f.appspot.com",
  messagingSenderId: "888776209337",
  appId: "1:888776209337:web:ad586fe4c57c71627ffc68",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
