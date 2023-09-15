
const express = require('express');
const router = express.Router();
const carts = require('../DAO/cartsManager');
const cartManager = new carts("./data/cart.json");


// manejo de carts---------------------

router.post('/cart', (req, res) => {

    cartManager.addCart();
    res.status(200).json({ success: `carrito ${cartManager.nextId - 1} creado` });
});

router.delete('/cart/delete/:id', (req, res) => {
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



router.get('/cart/view', (req, res) => {

    res.send(cartManager.getCart());
});


module.exports = router;
