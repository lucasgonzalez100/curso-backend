
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const {Server} = require('socket.io');
const userRouter = require('./Routes/user.js')
const  mongoose  = require('mongoose');



const server = httpServer.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

const bodyParser = require('body-parser'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const exphbs = require('express-handlebars');

// mongoose.connect('mongodb+srv://gonzalezlucasnicolas69:123@cluster0.xi8psab.mongodb.net/?retryWrites=true&w=majority',(error)=>{
// if(error){
//   console.log("no se pudo conectar la base de datos"+error)
//   process.exit()
// }
// })

const connectToMongo = async () => {
  try {
    await mongoose.connect('mongodb+srv://gonzalezlucasnicolas69:123@cluster0.xi8psab.mongodb.net/?retryWrites=true&w=majority');
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.log("No se pudo conectar la base de datos" + error);
    process.exit();
  }
};

connectToMongo();

app.use('/api/users', userRouter)


const io = new Server (server);

io.on('connection', socket=>{
  console.log("nuevo cliente conectado")

  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado.');
  });
});
const productsRouter = require('./Routes/products')(io);
const cartsRouter = require('./Routes/carts');

app.use('/', productsRouter);
app.use('/api', cartsRouter);

// Configuración de archivos estáticos y Handlebars
app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

