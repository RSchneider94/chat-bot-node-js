const fs = require('fs');
// const productsList = require('./products.json');

module.exports = {
  recordNewMessage: function(userResponse) {
    fs.open('./records/records.txt', 'a', (err, fd) => {
      if (err) throw err;
      fs.appendFile(fd, "User: " + userResponse.userMessage + "\n", 'utf8', (err) => {
        fs.close(fd, (err) => {
          if (err) throw err;
        });
        if (err) throw err;
      });
    });
  },
  checkUserResponse: function(userResponse, productsList) {
    var matchedProduct = productsList.find(function(product) {
      return product.name === userResponse;
    });
    return matchedProduct.subscriptionPrice;
  }
};
