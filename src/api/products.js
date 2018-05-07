import firebase from 'firebase'

const products = {

  onChange: function(f) {
    return firebase.database().ref(`products`).on('value', function(snapshot) {
      snapshot.val() && f(Object.values(snapshot.val()));
    });
  },

  create: function(data) {
    const newProductKey = firebase.database().ref('products').push().key;
    console.log(data)
    return firebase.database().ref(`products/${newProductKey}`).set({ id: newProductKey, ...data });
  },

  delete: function(id) {
    firebase.database().ref(`products/${id}`).delete()
  },

  update: function(id, { name, price, description, imgUrl, dispDate }) {
    
  },

  uploadImages: function(imageFiles) {
    return imageFiles.map(file => (
      firebase.storage().ref(file.name).put(file).then(s => s.downloadURL)
    ));
  }
};

export default products;