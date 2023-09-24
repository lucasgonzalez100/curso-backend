
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const {Server} = require('socket.io');


const server = httpServer.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

const bodyParser = require('body-parser'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const exphbs = require('express-handlebars');

const io = new Server (server);

io.on('connection', socket=>{
  console.log("nuevo cliente conectado")

})

const productsRouter = require('./Routes/products')(io);
const cartsRouter = require('./Routes/carts');

app.use('/', productsRouter);

app.use('/api', cartsRouter);

app.use(express.static('public'));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
