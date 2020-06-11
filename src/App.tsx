import React from "react";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import useFetch, { useJsonResponse } from "react-use-fetch";
import Firebase, { FirebaseContext } from "./components/firebase-context";
import Search from "./components/search/Search";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Title } from "./components/title/Title";
import { getThemeProps } from "@material-ui/styles";

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
      <Router>
        <Link class="menu" to="/">
          Inventory
        </Link>{" "}
        |{" "}
        <Link class="menu" to="/lego">
          LEGO inventory
        </Link>
        <br></br>
        <br></br>
        <FirebaseContext.Provider value={firebase}>
          <Route exact path="/" component={Home} />
          <Route path="/lego" component={Lego} />
        </FirebaseContext.Provider>
      </Router>
    </>
  );
};

function Home() {
  return (
    <Title title="Inventory">
      <Search name="items" title="Inventory"></Search>
    </Title>
  );
}

function Lego() {
  return (
    <Title title="LEGO inventory">
      <Search name="legoItems" title="LEGO Inventory"></Search>
    </Title>
  );
}

export default App;
