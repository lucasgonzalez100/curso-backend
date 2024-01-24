const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema del usuario
const userColletion = "usuario" 
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Otros campos que puedas necesitar
});

// Crear un modelo a partir del esquema
const User = mongoose.model( userColletion , userSchema);

module.exports = User;
