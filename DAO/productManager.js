const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.nextId = 1;

        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                const maxId = Math.max(...this.products.map(product => product.id));
                this.nextId = maxId + 1;
               
            }
        } catch (error) {
            this.products = [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf8');
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail
            || !product.code || !product.stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        const existingProduct = this.products.find(existingProduct => existingProduct.code === product.code);
        if (existingProduct) {
            console.log("El codigo del producto ya existe");
            return;
        }

        const newProduct = {
            ...product,
            id: this.nextId,
            status: true
        };
        this.products.push(newProduct);
        this.nextId++;

        this.saveProducts();

        console.log("Producto agregado:", newProduct);
    }

    getProducts() {
        this.loadProducts();
        return this.products;
    }

    getProductById(id) {
        this.loadProducts();
        const product = this.products.find(existingProduct => existingProduct.id === id);
        if (product) {
            return product;
        } else {
            console.log("Producto no encontrado");
            return null;
        }
    }

    getProductByCode(productCode) {
        return this.products.find(product => product.code === productCode);
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = {
                ...this.products[productIndex],
                ...updatedFields
            };
            this.saveProducts();
            console.log("Producto actualizado:", this.products[productIndex]);
        } else {
            console.log("Producto no encontrado");
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            const deletedProduct = this.products.splice(productIndex, 1)[0];
            this.saveProducts();
            console.log("Producto eliminado:", deletedProduct);
        } else {
            console.log("Producto no encontrado");
        }
    }
}


module.exports =  ProductManager