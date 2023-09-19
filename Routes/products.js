
const express = require('express');
const router = express.Router();
const ProductManager = require('../DAO/productManager');
const productManager = new ProductManager('./data/archivo.json');

router.get('/realProducts',(req, res) => {
      res.render('realTimeProducts');
    });
    router.post('/realProducts', (req, res) => {
      const product = req.body;
      console.log(product)

      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
           res.status(400).json({ mensaje: 'Es necesario completar todos los campos' });
        // return res.render('realTimeProducts');
      }
      const existingProduct = productManager.getProductByCode(product.code);
      if (existingProduct) {
           res.status(401).json({ mensaje: 'El código del producto ya existe' });
        //   return res.render('realTimeProducts');
      }
      productManager.addProduct(product);

       res.status(200).json({ mensaje: 'Producto agregado correctamente' });
    //   return res.render('realTimeProducts');
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
