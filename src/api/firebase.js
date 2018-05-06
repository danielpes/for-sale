import firebase from 'firebase'

export function firebaseInit() {
  const config = {
    apiKey: "AIzaSyBSoVvNW8pYSKyuliFsJxNhWE5iigQI-Ig",
    authDomain: "moving-out-sale.firebaseapp.com",
    databaseURL: "https://moving-out-sale.firebaseio.com",
    projectId: "moving-out-sale",
    storageBucket: "moving-out-sale.appspot.com",
    messagingSenderId: "550814343043"
  };
  firebase.initializeApp(config);
}

export function doLogin(email, password) {

  const errorMsg = "Please verify e-mail and password."

  if (!email || email.length < 4) {
    return new Promise((res, rej) => {
      throw new Error(errorMsg)
    });
  }
  if (!password || password.length < 4) {
    return new Promise((res, rej) => {
      throw new Error(errorMsg)
    });
  }
  // Sign in with email and pass.
  // [START authwithemail]
  return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      alert('Incorrect password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END authwithemail]
}