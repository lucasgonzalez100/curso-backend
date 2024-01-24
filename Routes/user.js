const express = require('express');
const router = express.Router();
const User = require('../DAO/usersManager.js')

router.get('/',async(req,res)=>{

  try{
    let users = await User.find()
    res.status (200).send ({result:"success",payload:users})
  }
  catch(error){
    console.log("no se pudieron obtener usuarios:"+error);
    res.status(500).send({result:"error",message:"error al obtener usuarios"})
  }
})

router.post ('/', async(req, res)=>{
  
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