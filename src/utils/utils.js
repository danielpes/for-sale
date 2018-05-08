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
  },

  scaleImage: function(file, newWidth, imageType, imageArguments) {
    let image, oldWidth, oldHeight, newHeight, canvas, ctx;

    // Provide default values
    imageType = imageType || "image/jpeg";
    imageArguments = imageArguments || 0.7;

    // Create a temporary image so that we can compute the height of the downscaled image.
    image = new Image();
    
    return new Promise((resolve, reject) => {
      image.onload = function() {
        oldWidth = image.width;
        oldHeight = image.height;
        newHeight = Math.floor(oldHeight / oldWidth * newWidth)
        canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, newWidth, newHeight);
        canvas.toBlob(resolve, imageType, imageArguments);
      }
      image.src = URL.createObjectURL(file);
    });
  }
}

export default utils