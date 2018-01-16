/****************************************************
* Tool.js is responsible for handling the functions *
* that are important to index.js (main app).        *
* Example: function to write (log) user messages    *
* to a file inside project.                         *
 ****************************************************/

const fs = require('fs');
const productsList = require('./products.json');

module.exports = {
  /**
   * This function is responsible to handle the record (log) of user's message
   * @param  {string} userResponse receive the user input from form
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
  /**
   * This function is responsible to handle the user input message
   * @param  {string} userResponse receive the user input from form
   * @return {array or string} returns arrays in cases where user asks for a list or string if just single product
   */
  checkUserResponse: function(userResponse) {
    /** @type {Array} This variable is responsible to return array when the user asks for listing. Eg: brands */
    var arrFilteredProductsList = [];

    switch(true) {
      case userResponse === '':
        return "Sorry, you should type something.";
        break;
      case userResponse.includes('list'):
        productsList.forEach(function(product) {
          arrFilteredProductsList.push(product.name);
        });
        return "Here is the list of all of our products:<br><br>" + arrFilteredProductsList.join('<br>');
        break;
      case userResponse.includes('categories') || userResponse.includes('category'):
        productsList.forEach(function(product) {
          arrFilteredProductsList.push(product.category);
        });
        return "Here is the list of all of our product's categories:<br><br>" + arrFilteredProductsList.join('<br>');
        break;
      default:
        /***********************************************************************************
         * This arrays are used as temporary to assign functions of filtering and finding. *
         ***********************************************************************************/
        var responseMatchedWithProductsBrands = productsList.filter(product => product.brand.toUpperCase().includes(userResponse.toUpperCase()));
        var responseMatchedWithProductsCategories = productsList.filter(product => product.category.toUpperCase().includes(userResponse.toUpperCase()));
        var responseMatchedWithSingleProduct = productsList.find(product => product.name.toUpperCase() === userResponse.toUpperCase());

        /****************************************************************************************************************
         * returns according to what user asked for. E.g a list of product's according to a specific brand or categorie *
         ****************************************************************************************************************/
        if (responseMatchedWithProductsBrands.length >= 1) {
          responseMatchedWithProductsBrands.forEach(product => arrFilteredProductsList.push(product.name));
          return "Here is the product's brands that matched your criteria:<br><br>" + arrFilteredProductsList.join('<br>');
        } else if(responseMatchedWithProductsCategories.length >= 1) {
          responseMatchedWithProductsCategories.forEach(product => arrFilteredProductsList.push(product.name));
          return "Here is the product's categories that matched your criteria:<br><br>" + arrFilteredProductsList.join('<br>');
        } else if(responseMatchedWithSingleProduct){
          return "The subscription price for " + responseMatchedWithSingleProduct.name + " is €" + responseMatchedWithSingleProduct.subscriptionPrice;
        } else {
          return "Sorry, no products matched your criteria. Try something else.";
        }
    }
  }
};
