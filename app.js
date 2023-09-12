const fs = require('fs');
const express = require('express');
const { cartManager, router } = require("./carts.js");
const { productManager } = require("./productManager.js");
const http = require('http');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/carts.json', router);
app.use('/archivo.json', router);
const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Escuchando en el puerto 8080');
});

// manejo de products-----------------

app.post('/api/productos/add', (req, res) => {
    const product = req.body;

    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    const existingProduct = productManager.getProductByCode(product.code);
    if (existingProduct) {
        return res.status(400).json({ mensaje: 'El código del producto ya existe' });
    }
    productManager.addProduct(product);

    return res.status(201).json({ mensaje: 'Producto agregado correctamente' });
});

app.get('/', (req, res) => {
    res.send(' esta es la pag principal ');
});

app.get('/api/productos', (req, res) => {

    res.send(productManager.getProducts());
});

app.get('/api/productos/:id', (req, res) => {

    const productId = productManager.getProductById(parseInt(req.params.id));
    if (!productId) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.send(productId);
});

app.delete('/api/productos/delete/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const deletedProduct = productManager.getProductById(productId);
    if (deletedProduct) {
        productManager.deleteProduct(productId);
        return res.status(200).json({ mensaje: 'Producto borrado' });
    } else {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});

app.put('/api/productos/put/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedFields = req.body;
    const existingProduct = productManager.getProductById(productId);

    if (existingProduct) {
        productManager.updateProduct(productId, updatedFields);
        return res.status(200).json({ mensaje: 'Producto editado' });
    } else {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});

// manejo de carts---------------------

app.post('/api/cart', (req, res) => {

    cartManager.addCart();
    res.status(200).json({ success: `carrito ${cartManager.nextId - 1} creado` });
});

app.delete('/api/cart/delete/:id', (req, res) => {
    const cartId = parseInt(req.params.id);
    const cartExists = cartManager.cartExists(cartId)

    if (cartExists) {
        cartManager.deleteCart(cartId);
        return res.status(200).json({ mensaje: `Carrito ${cartId} fue borrado` });
    } else {
        return res.status(404).json({ mensaje: `Carrito ${cartId} no encontrado` });

    }
});


// cartManager.deleteCart(parseInt(req.params.id));
// return res.status(404).json({ mensaje: 'carrito borrado' });



app.get('/api/cart/view', (req, res) => {

    res.send(cartManager.getCart());
});

