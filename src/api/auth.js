import firebase from 'firebase'

const auth = {
  doLogin: function(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },

  doLogout: function() {
    return firebase.auth().signOut()
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
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      firebaseUser && f({
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email
      })
    });
  }
}

export default auth