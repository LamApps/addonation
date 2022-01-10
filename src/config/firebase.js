import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyC5bd4s23YQZaaE6zDo3g39IsHIdVLcoq0',
  authDomain: 'addonation-a9598.firebaseapp.com',
  projectId: 'addonation-a9598',
  databaseURL: 'https://addonation-a9598-default-rtdb.firebaseio.com',
  storageBucket: 'addonation-a9598.appspot.com',
  messagingSenderId: '675640908306',
  appId: '1:675640908306:web:a5c6bde4c790d6df31d6cb'
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;

export const baseUrl = 'https://addonation.org';