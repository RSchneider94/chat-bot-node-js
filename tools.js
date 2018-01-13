const fs = require('fs');

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
  checkUserResponse: function(userResponse, productsList) {
    if(userResponse === '') var error = "Sorry, you should type something.";
    var matchedProduct = productsList.find(function(product) {
      return product.name.toUpperCase() === userResponse.toUpperCase();
    });
    return matchedProduct && !error ? "The subscription price of the asked product is: " + matchedProduct.subscriptionPrice : !error ? "Sorry, no product was found with this criteria" : error;
  }
};
