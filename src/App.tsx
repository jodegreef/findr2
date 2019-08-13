import React from "react";
import "./App.css";
import { AppBar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";

import Firebase, { FirebaseContext } from "./components/firebase-context";
import Search from "./components/search/Search";

const firebase = new Firebase();

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(firebase.auth);
  const login = () => {
    firebase.auth.signInWithEmailAndPassword("", "");
  };

  login();

  if (loading) {
    return <span>Auth'ing</span>;
  }
  if (error) {
    return <span>Error during auth'ing</span>;
  }

  if (!user) return <span>User not loaded yet</span>;

  return (
    <>
      <FirebaseContext.Provider value={firebase}>
        <AppBar position="static">TEST</AppBar>
        <Search></Search>
      </FirebaseContext.Provider>
    </>
  );
};

export default App;
