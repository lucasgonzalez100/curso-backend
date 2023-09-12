
const fs = require('fs');
const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

class carts {
    constructor(filePath) {
        this.path = filePath;
        this.carts = [];
        this.nextId = 1;
        this.loadCarts();
    }
    loadCarts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.carts = JSON.parse(data);
           
            if (this.carts.length > 0) {
                const maxId = Math.max(...this.carts.map(cart => cart.id));
                this.nextId = maxId + 1;
            //  this.nextId = this.carts.length + 1;
         }}
        catch (error) {
            this.carts = [];
        }
    }

    saveCart() {
        fs.writeFileSync(this.path, JSON.stringify(this.carts), 'utf8');
    }

    addCart(carts) {
        this.loadCarts(); 
        
        const newCart = {
            id: this.nextId, 
            products: {},
            quantity: 1  
    };
    this.carts.push(newCart);
    this.nextId++;
    this.saveCart();

    console.log("carrito se agrego", newCart);
}

    getCart() {
        this.loadCarts(); 
        return this.carts;
    }
}





const cartManager = new carts ("./cart.json");

module.exports = { cartManager, router };
