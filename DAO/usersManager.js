const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCollection = "usuario";
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: ["usuario"] ,

});

userSchema.methods.guardar = async function() {
  try {
    const resultado = await this.save();
    console.log(resultado);
    return resultado;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const User = mongoose.model(userCollection, userSchema);

module.exports = User;
