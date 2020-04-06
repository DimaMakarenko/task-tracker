import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAiWVY9XnfvRK0WXIdNn2EpmCMdHvpGMQ4',
  authDomain: 'rn-tasktraker.firebaseapp.com',
  databaseURL: 'https://rn-tasktraker.firebaseio.com',
  projectId: 'rn-tasktraker',
  storageBucket: 'rn-tasktraker.appspot.com',
  messagingSenderId: '288385915061',
  appId: '1:288385915061:web:054a5dd070a4d005d546fc',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
