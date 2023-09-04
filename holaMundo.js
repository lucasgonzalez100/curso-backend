const express = require('express');
const http = require('http');

const app = express();

app.get('/', (req, res) => {
    res.send('Este es mi primer "Hola Mundo" de backend');
});

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Escuchando en el puerto 8080');
});
