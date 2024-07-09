// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBecRaZKBC5KAWouNTAnM5k8FcARpkXRso',
  authDomain: 'zalo-77560.firebaseapp.com',
  projectId: 'zalo-77560',
  storageBucket: 'zalo-77560.appspot.com',
  messagingSenderId: '294638203599',
  appId: '1:294638203599:web:2c8dcffe9ac698da6bbdba',
  measurementId: 'G-29WYTBSDTQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
