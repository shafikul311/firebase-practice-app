
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import './App.css';

import firebaseConfig from "./firebase.config";


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


function App() {

  const [user , setUser] = useState({})
  

  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var ghProvider = new firebase.auth.GithubAuthProvider();
    const handleGoogleSignIn = () => {

      firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log('google user',user)

    setUser(user);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log( errorCode,errorMessage ,email)

    // ...
  });
      
    }

    const handleFacebookSignIn = () => {

      firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    console.log('facebook',user)
   setUser(user)

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    var displayName  = error.displayName;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log( errorCode,errorMessage ,email ,displayName )

    // ...
  });

    }

    const handleGithubSignIn = ()=>{

      firebase
  .auth()
  .signInWithPopup(ghProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = credential.accessToken;

    // The signed-in user info.
    var user = result.user;
    console.log('github',user)
    setUser(user)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log( errorCode,errorMessage ,email)
    // ...
  });



    }
  return (
    <div className="App">

      <button onClick={handleGoogleSignIn}> Sign in using Google</button>
      <button onClick={handleFacebookSignIn}> Sign in using Facebook</button>
      <button onClick={handleGithubSignIn}> Sign in using Github</button>
      <h1>Email :{user.email}</h1>
      <p>Name :{user.displayName}</p>
      <img src={user.photoURL} alt=""/>

     
    </div>
  );
}

export default App;
