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

router.get('/post',(req, res) => {
  
    res.render('formUser');

    });

    router.post('/post', async (req, res) => {
      const { username, password, email } = req.body;
      
      if (!username || !password || !email) {
        return res.status(400).json({ mensaje: 'Es necesario completar todos los campos' });
      }
    
      // Crear una nueva instancia del modelo User
      const user = new User({ username, password, email });
    
      try {
        // Guardar el usuario en la base de datos
        const result = await user.guardar();
        res.send({ status: "success", payload: result });
      } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
      }
    });
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