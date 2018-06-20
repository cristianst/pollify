// Firebase Config
import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDhonzpmQwxUIIMne9HsWr044LQpx_hrNk',
  authDomain: 'pollify-19bc7.firebaseapp.com',
  databaseURL: 'https://pollify-19bc7.firebaseio.com',
  projectId: 'pollify-19bc7',
  storageBucket: 'pollify-19bc7.appspot.com',
  messagingSenderId: '874384727767',
  persistence: true,
  enableRedirectHandling: true,
};

const firebaseApp = firebase.initializeApp(config);
const firestore = firebaseApp.firestore();

export default firestore;

