const utils = {
  formatPrice: function(price) {
    return `€ ${parseFloat(price).toFixed(2)}`
  }
}

export default utils