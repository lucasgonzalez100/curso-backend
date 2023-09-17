
const express = require('express');
const productsRouter = require('./Routes/products');
const cartsRouter = require('./Routes/carts');
const exphbs = require('express-handlebars');

const http = require('http');
// const { title } = require('process');

const app = express();
app.use(express.static('public'));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', productsRouter);
app.use('/api', cartsRouter);

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Escuchando en el puerto 8080');
});


