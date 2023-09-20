
const express = require('express');
const router = express.Router();
const ProductManager = require('../DAO/productManager');
const productManager = new ProductManager('./data/archivo.json');

router.get('/realProducts',(req, res) => {
  let products = productManager.getProducts();
  
      res.render('realTimeProducts',{ productos: products });
    });
    router.post('/realProducts', (req, res) => {
      const product = req.body;

      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
           res.status(400).json({ mensaje: 'Es necesario completar todos los campos' });
      }
      const existingProduct = productManager.getProductByCode(product.code);
      if (existingProduct) {
           res.status(401).json({ mensaje: 'El código del producto ya existe' });
      }
      productManager.addProduct(product);

       res.status(200).json({ mensaje: 'Producto agregado correctamente' });
     });

  router.delete('/realProducts/:id', (req, res) => {
      const productId = parseInt(req.params.id);
      const deletedProduct = productManager.getProductById(productId);
      console.log(deletedProduct)
      if (deletedProduct) {
          productManager.deleteProduct(productId);
          return res.status(200).json({ mensaje: 'Producto borrado' });
      } else {
          return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
  });
  router.put('/realProducts/:id', (req, res) => {
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


  
//   router.get('/products', (req, res) => {
//     let products = productManager.getProducts();
  
//       res.render('home', { productos: products });
//   });
  
//   router.get('/products/:id', (req, res) => {
//       const productId = productManager.getProductById(parseInt(req.params.id));
//       if (!productId) {
//           return res.status(404).json({ mensaje: 'Producto no encontrado' });
//       }
//       res.send(productId);
//   });
  
//   router.delete('/products/delete/:id', (req, res) => {
//       const productId = parseInt(req.params.id);
//       const deletedProduct = productManager.getProductById(productId);
//       if (deletedProduct) {
//           productManager.deleteProduct(productId);
//           return res.status(200).json({ mensaje: 'Producto borrado' });
//       } else {
//           return res.status(404).json({ mensaje: 'Producto no encontrado' });
//       }
//   });
  
//   router.put('/products/put/:id', (req, res) => {
//       const productId = parseInt(req.params.id);
//       const updatedFields = req.body;
//       const existingProduct = productManager.getProductById(productId);
  
//       if (existingProduct) {
//           productManager.updateProduct(productId, updatedFields);
//           return res.status(200).json({ mensaje: 'Producto editado' });
//       } else {
//           return res.status(404).json({ mensaje: 'Producto no encontrado' });
//       }
//   });

module.exports = router;
