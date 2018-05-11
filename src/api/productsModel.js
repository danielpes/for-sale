import firebase from 'firebase'

const productsModel = {

  onChange: function(f) {
    return firebase.database().ref(`products`).on('value', function(snapshot) {
      const products = snapshot.val() ? Object.values(snapshot.val()) : [];
      return f(products.map((p) => {
        return { ...p, dispDate: new Date(p.dispDate) }
      }))
    });
  },

  create: function(data) {
    const newProductKey = firebase.database().ref('products').push().key;
    return firebase.database().ref(`products/${newProductKey}`).set({ id: newProductKey, ...data, dispDate: data.dispDate.valueOf() });
  },

  delete: function(id) {
    return firebase.database().ref(`products/${id}`).remove();
  },

  update: function(id, newData) {
    return firebase.database().ref(`products/${id}`).set(newData);
  },

  addPersonToWaitList: function(product, person) {
    const id = product.id;
    const currentList = product.waitList || [];
    const personToAdd = { ...person, date: new Date().valueOf() };
    return firebase.database().ref(`products/${id}/waitList`).set([...currentList, personToAdd])
  },

  uploadImages: function(imageFiles) {
    return imageFiles.map(file => (
      firebase.storage().ref(file.name).put(file).then(s => s.downloadURL)
    ));
  }
};

export default productsModel;