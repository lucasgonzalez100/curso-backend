const fs = require('fs');

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
            }
        }
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
    deleteCart(id) {
        const cartIndex = this.carts.findIndex(cart => cart.id === id);
        if (cartIndex !== -1) {
            const deletedCart = this.carts.splice(cartIndex, 1)[0];
            this.saveCart();
            console.log("Carrito eliminado:", deletedCart);
        } else {
            console.log("Carrito no encontrado");
        }
    }

    getCart() {
        this.loadCarts();
        return this.carts;
    }

    cartExists(cartId) {
        return this.carts.some(cart => cart.id === cartId);
    }
}

module.exports = carts
