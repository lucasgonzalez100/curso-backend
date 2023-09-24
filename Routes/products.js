module.exports = (io) => {
const express = require('express');
const router = express.Router();
const ProductManager = require('../DAO/productManager');
const productManager = new ProductManager('./data/archivo.json');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false })); 
router.use(bodyParser.json()); 

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

      io.emit('producto_agregado', product);


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

  return router;

};
