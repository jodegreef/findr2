import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

// https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/
const config = {
  apiKey: "AIzaSyCS0246RVBCxMukosygfoVBiCfuzXoCJk0",
  authDomain: "findr2.firebaseapp.com",
  databaseURL: "https://findr2.firebaseio.com",
  projectId: "findr2",
  storageBucket: "findr2.appspot.com",
  messagingSenderId: "102084671150",
  appId: "1:102084671150:web:f5f8468fed8a7dcb"
};

class Firebase {
  auth: app.auth.Auth;
  db: app.database.Database;
  fireStore: app.firestore.Firestore;

  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.fireStore = app.firestore();
  }
}

export default Firebase;
