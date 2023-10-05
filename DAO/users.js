const mongoose = require('mongoose');

// Define el esquema de usuario
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Asegura que cada correo electrónico sea único
  }
});

// Crea un modelo de usuario basado en el esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
