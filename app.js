const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {createServer} = require('http');
const {Server} = require('socket.io');
const exphbs = require('express-handlebars');

const productsRouter = require('./Routes/products');
const cartsRouter = require('./Routes/carts');


const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
      // Emitir un evento al cliente
    socket.emit("nuevo-mensaje", "¡Hola desde el servidor con socket!");
  });
  

httpServer.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
});

app.use('/', productsRouter);

app.use('/api', cartsRouter);

app.use(express.static('public'));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

module.exports = { app, httpServer, io };
