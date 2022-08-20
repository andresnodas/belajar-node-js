const { json } = require('body-parser');
const { fileLoader } = require('ejs');
const fs = require('fs');
const path = require('path');
const { createBrotliCompress } = require('zlib');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart{
    static addProduct(id, productPrice){

        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };

            if(!err){
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex(object => object.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            if(existingProduct){
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            
            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });

    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {

            if(err)
                return;

            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(object => object.id === id);
            if(!product)
                return;

            const productQty = product.qty;

            updatedCart.products = updatedCart.products.filter(object => object.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productQty * productPrice;

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }

    static getCart(callback) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);

            if(err) {
                callback(null);
            } else {
                callback(cart);
            }

        });
    }
}
