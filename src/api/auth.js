import firebase from 'firebase'

const auth = {
  doLogin: function(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },

  handleError: function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    if (errorCode === 'auth/wrong-password') {
      alert('Incorrect password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  },

  onAuthChange: function(f) {
    firebase.auth().onAuthStateChanged(f)
  } 
}

export default auth