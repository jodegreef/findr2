import React, { useEffect } from "react";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import useFetch, { useJsonResponse } from "react-use-fetch";
import Firebase, { FirebaseContext } from "./components/firebase-context";
import Search from "./components/search/Search";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Title } from "./components/title/Title";
import { getThemeProps } from "@material-ui/styles";
import firebase from "firebase";

const firebaseCtx = new Firebase();

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(firebaseCtx.auth);

  const { response } = useFetch("/config.json");

  const [json] = useJsonResponse(response);

  const login = () => {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebaseCtx.auth.signInWithRedirect(provider);
    // firebase.auth().signOut();
    // let provider = new firebase.auth.t< .TwitterAuthProvider();
    // firebase
    //   .auth.signInWithRedirect()

    //firebase.auth.signInWithEmailAndPassword(json.username, json.pw);
  };

  useEffect(() => {
    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        debugger;
        if (!result || !result.user || !firebase.auth().currentUser) {
          return;
        }
        debugger;
        alert("jos");
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, []);

  // firebase
  //   .auth()
  //   .getRedirectResult()
  //   .then(function(result) {
  //     if (result.credential) {
  //       // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
  //       // You can use these server side with your app's credentials to access the Twitter API.
  //       // var token = result.credential.accessToken;
  //       // var secret = result.credential.secret;
  //       // ...
  //     }
  //     // The signed-in user info.
  //     alert("ok");
  //     debugger;
  //     var user = result.user;
  //   })
  //   .catch(function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // The email of the user's account used.
  //     var email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     var credential = error.credential;
  //     // ...
  //   });

  // if (json) {
  //   login();
  // }
  if (loading) {
    return <span>Auth'ing</span>;
  }
  if (error) {
    return <span>Error during auth'ing</span>;
  }

  if (!user) return <span>User not loaded yet</span>;

  return (
    <>
      <a onClick={() => login()}>login</a>
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
        <FirebaseContext.Provider value={firebaseCtx}>
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
