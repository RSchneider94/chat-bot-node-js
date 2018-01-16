/****************************************************
* Tool.js is responsible for handling the functions *
* that are important to index.js (main app).        *
* Example: function to write (log) user messages    *
* to a file inside project.                         *
 ****************************************************/


const fs = require('fs');
const productsList = require('./products.json');

module.exports = {
  /*
    Function used to record each user message into a file in records/records.text
    params: userResponse
  */
  recordNewMessage: function(userResponse) {
    fs.open('./records/records.txt', 'a', (err, fd) => {
      if (err) throw err;
      fs.appendFile(fd, userResponse + "\n", 'utf8', (err) => {
        fs.close(fd, (err) => {
          if (err) throw err;
        });
        if (err) throw err;
      });
    });
  },
  /*
    Function used to check each user message and makes bot reply to him according
    params: userResponse, productsList : array of objects
  */
  checkUserResponse: function(userResponse) {
    if(userResponse === '') var error = "Sorry, you should type something.";
    if(userResponse === 'list') {
      var arrProducts = [];
      productsList.forEach(function(product) {
        arrProducts.push(product.name);
      });
      return arrProducts.join('<br>');
    }
    var matchedProduct = productsList.find(function(product) {
      return product.name.toUpperCase() === userResponse.toUpperCase();
    });
    return matchedProduct && !error ? "The subscription price of " + matchedProduct.name + " product is: €" + matchedProduct.subscriptionPrice : !error ? "Sorry, no product was found with this criteria" : error;
  }
};
