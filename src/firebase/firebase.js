
import firebase from 'firebase'
require('firebase/auth')

var firebaseConfig = {
  apiKey: "AIzaSyAzNmxpHCM-J3D4T7rpbfevUypcRPakvac",
  authDomain: "whaler-ab6a5.firebaseapp.com",
  databaseURL: "https://whaler-ab6a5.firebaseio.com",
  projectId: "whaler-ab6a5",
  storageBucket: "whaler-ab6a5.appspot.com",
  messagingSenderId: "131278303093",
  appId: "1:131278303093:web:a8196e91b5a1f765",
  storageBucket: "gs://whaler-ab6a5.appspot.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
const db = firebase.database();
const auth = firebase.auth();
const binsRef = db.ref("bins")
const usersRef = db.ref("users")


export {
  firebaseConfig,
  db,
  storage,
  auth,
  binsRef,
  usersRef,
  firebase
};
