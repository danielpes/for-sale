import firebase from 'firebase'

const products = {
  get: function(id) {

  },

  find: function(name) {

  },

  getAll: function() {

  },

  add: function(data) {
    var newProductKey = firebase.database().ref().child('products').push().key;
    return firebase.database().ref(`products/${newProductKey}`).set(data);
  },

  remove: function(id) {

  },

  edit: function(id, { name, price, description, picUrls, dispDate }) {
    
  }
};

export default products;