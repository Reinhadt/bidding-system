const fs = require("fs");

const findProduct = (nameKey, productsArray, last_bidder, new_price, productData) => {
  for(let i = 0; i < productsArray.length; i ++){
    if (productsArray[i].name === nameKey) {
      productsArray[i].last_bidder = last_bidder
      productsArray[i].price = new_price
    }
  }

  const stringData = JSON.stringify(productData, null, 2);
  fs.writeFile('data.json', stringData, (err) => {
    console.error(err);
  });

}

module.exports = {
  findProduct
}