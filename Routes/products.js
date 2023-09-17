
const express = require('express');
const router = express.Router();
const ProductManager = require('../DAO/productManager');
const productManager = new ProductManager('./data/archivo.json');


router.get('/api', (req, res) => {
  res.send(' esta es la pag principal ');
});

router.post('/productos/add', (req, res) => {
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
  
  
  router.get('/productos', (req, res) => {
    let products = productManager.getProducts();
  
      res.render('home', { productos: products });
  });
  
  router.get('/productos/:id', (req, res) => {
  
      const productId = productManager.getProductById(parseInt(req.params.id));
      if (!productId) {
          return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
      res.send(productId);
  });
  
  router.delete('/productos/delete/:id', (req, res) => {
      const productId = parseInt(req.params.id);
      const deletedProduct = productManager.getProductById(productId);
      if (deletedProduct) {
          productManager.deleteProduct(productId);
          return res.status(200).json({ mensaje: 'Producto borrado' });
      } else {
          return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
  });
  
  router.put('/productos/put/:id', (req, res) => {
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
  

module.exports = router;
