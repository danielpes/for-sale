import firebase from 'firebase'

const api = {
  
  init: function() {
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
};

export default api;
