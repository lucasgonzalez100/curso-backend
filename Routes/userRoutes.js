const express = require('express');
const router = express.Router();
const User = require('../DAO/usersManager.js')
const { createHash, isValidPassword } = require('../utils/bcrypt.js');
const initializePassport  = require('../config/passportConfig.js');
const { generateToken ,authToken } = require('../config/jwtConfig.js');
const passport = require('passport');

initializePassport();

router.get('/', async (req, res) => {
  try {
    let users = await User.find();
    let usuarios = users.map(user => user.toObject());
    res.status(200).render('users', { usuarios, result: "exitos", payload: users });
  }  
  catch (error) {
    console.log("no se pudieron obtener usuarios:" + error);
    res.status(500).send({ result: "error", message: "error al obtener usuarios" })
  }
})

router.post('/', async (req, res) => {
  try {
    const userEmail = req.body.email; 
    const user = await User.findOneAndDelete({ email: userEmail });
    res.status(201).send({ success: "Usuario eliminado", message: user });
  } catch (error) {
    console.log("Error al eliminar usuario: " + error);
    res.status(500).send({ result: "error", message: "Error al eliminar usuario" });
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ mensaje: 'Es necesario completar todos los campos' });
  }
  const user = new User({ username, password: createHash(password), email });

  try {
    const result = await user.guardar();

    delete user.password;
    const accessToken = generateToken(user);
    res.status(201).send({accessToken, message: 'Created',payload: result});
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post("/login", async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});

  if(!user || !isValidPassword(user, password)){
    return res.render('failLogin' );
  }
  user.password = '';
  const accessToken = generateToken(user);
  if (user) {
    const { username, } = user;

  res.render('welcome', { user, status: 'success', accessToken });
  }
});


module.exports = router;
