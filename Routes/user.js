const express = require('express');
const router = express.Router();
const User = require('../DAO/usersManager.js')

router.get('/',async(req,res)=>{

  try{
    let users = await User.find()
    res.status (200).send ({result:"exitos",payload:users})
  }
  catch(error){
    console.log("no se pudieron obtener usuarios:"+error);
    res.status(500).send({result:"error",message:"error al obtener usuarios"})
  }
})

router.post ('/post', async(req, res)=>{
  const {username,email,password} = req.body;
  if (!username ||  !password || !email){
    res.status(400).json({ mensaje: 'Es necesario completar todos los campos' });
  }
  let result = await User.create({
    username,
    email,
    password
  });
  res.send({status:"success",playload:result})
} )

module.exports = router;


// const mongoose = require('mongoose');
// const mongoURI = 'mongodb://localhost:27017';

// const connectToMongo = async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log('Conectado a MongoDB');
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = connectToMongo;