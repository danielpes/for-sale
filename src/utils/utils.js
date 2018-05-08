const utils = {
  formatPrice: function(price) {
    return `€ ${parseFloat(price).toFixed(2)}`
  },

  delay: function(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
}

export default utils