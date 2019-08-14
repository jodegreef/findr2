import React from "react";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import useFetch, { useJsonResponse } from "react-use-fetch";
import Firebase, { FirebaseContext } from "./components/firebase-context";
import Search from "./components/search/Search";

const firebase = new Firebase();

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(firebase.auth);

  const { response } = useFetch("/config.json");

  const [json] = useJsonResponse(response);

  const login = () => {
    firebase.auth.signInWithEmailAndPassword(json.username, json.pw);
  };

  if (json) {
    login();
  }
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
        <Search></Search>
      </FirebaseContext.Provider>
    </>
  );
};

export default App;
