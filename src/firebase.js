import * as firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY
};
firebase.initializeApp(config);

const database = firebase.database();

export default database;