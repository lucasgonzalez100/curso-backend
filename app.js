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
            this.nextId = this.products.length + 1;
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
            id: this.nextId
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

const productManager = new ProductManager('./archivo.json');


productManager.addProduct({
    title: "Producto 1",
    description: "Descripcion de producto 1",
    price: 39.50,
    thumbnail: "ruta/imagen1.jpg",
    code: "P1",
    stock: 10
});

productManager.addProduct({
    title: "Producto 2",
    description: "Descripcion de producto 2",
    price: 50.80,
    thumbnail: "ruta/imagen2.jpg",
    code: "P2",
    stock: 5
});

productManager.addProduct({
    title: "Producto 3",
    description: "Descripcion de producto 3",
    price: 60,
    thumbnail: "ruta/imagen3.jpg",
    code: "P3",
    stock: 8
});

console.log("Lista de productos:", productManager.getProducts());

const productById = productManager.getProductById(3);
if (productById) {
    console.log("Producto encontrado", productById);
}

productManager.updateProduct(2, {
    title: "Producto 2 Actualizado",
    price: 55.00
});

productManager.deleteProduct(1);

console.log("Lista de productos finales:", productManager.getProducts());