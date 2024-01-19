const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://coderBaseDatos:<password>@cluster0.byj5ugq.mongodb.net/?retryWrites=true&w=majority',
 { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Conexión exitosa a la base de datos'))
.catch(err => console.error('Error de conexión a la base de datos', err));

const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: String,
  age: Number,
 
});

const MyModel = mongoose.model('MyModel', mySchema);

const myDocument = new MyModel({ name: 'Lucas', age: 28 });
myDocument.save()
.then(doc => console.log('Documento guardado', doc))
.catch(err => console.error('Error al guardar el documento', err));

// otra opcion mañana chequear 

const { MongoClient } = require("mongodb");

const username = encodeURIComponent("<username>");
const password = encodeURIComponent("<password>");
const cluster = "<clusterName>";
const authSource = "<authSource>";
const authMechanism = "<authMechanism>";

let uri =
  `mongodb+srv://${username}:${password}@${cluster}/?authSource=${authSource}&authMechanism=${authMechanism}`;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("<dbName>");
    const ratings = database.collection("<collName>");

    const cursor = ratings.find();

    await cursor.forEach(doc => console.dir(doc));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
