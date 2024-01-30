const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCollection = "usuario";
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

userSchema.methods.guardar = function() {
  return this.save()
    .then(resultado => {
      console.log(resultado);
    })
    .catch(err => {
      console.log(err);
    });
}

const User = mongoose.model(userCollection, userSchema);

module.exports = User;
