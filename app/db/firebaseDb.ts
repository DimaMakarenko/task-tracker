import * as firebase from 'firebase';

// @ts-ignore
import { API_KEY, AUTH_DOMAIN, DATABASE_URL, STORAGE_BUCKET } from 'react-native-dotenv';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  storageBucket: STORAGE_BUCKET,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
