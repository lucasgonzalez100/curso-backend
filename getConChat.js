const express = require('express');
const app = express();
const PORT = 3000; // Puedes cambiar el puerto según tu preferencia

// Simulemos una lista de productos para este ejemplo
const productos = [
  { id: 1, nombre: 'Producto 1', precio: 10 },
  { id: 2, nombre: 'Producto 2', precio: 20 },
  { id: 3, nombre: 'Producto 3', precio: 30 },
];

// Endpoint para obtener todos los productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// Endpoint para obtener un producto por ID
app.get('/productos/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const producto = productos.find((p) => p.id === productId);

  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  res.json(producto);
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
