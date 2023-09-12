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

app.get('/', (req, res) => {
    res.send(' esta es la pag principal ');
});

app.get('/productos', (req, res) => {

    res.send(productManager.getProducts());
});

app.get('/productos/:id', (req, res) => {

    const productId = productManager.getProductById(parseInt(req.params.id));
      if (!productId) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.send(productId);
});

app.delete ('/productos/delete/:id', (req, res)=>{
   if(productManager.getProductById){
    productManager.deleteProduct(parseInt(req.params.id));
    return res.status(200).json({ mensaje: 'Producto borrado' });
   }
   else {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
}
});


// manejo de carts---------------------

app.post('/cart', (req, res) => {

    cartManager.addCart();
    res.status(200).json({ success: `carrito ${cartManager.nextId-1} creado` });
});

app.delete ('/cart/delete/:id', (req, res)=>{
    const cartId = parseInt(req.params.id);
    const cartExists = cartManager.cartExists (cartId)

    if (cartExists) {
        cartManager.deleteCart(cartId);
        return res.status(200).json({ mensaje: `Carrito ${cartId} fue borrado` });
    } else {
        return res.status(404).json({ mensaje: `Carrito ${cartId} no encontrado`});
        
    }
});


  // cartManager.deleteCart(parseInt(req.params.id));
    // return res.status(404).json({ mensaje: 'carrito borrado' });



app.get('/cart/view', (req, res) => {

    res.send(cartManager.getCart());
});

