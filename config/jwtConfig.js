const jwk = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const keySing = process.env.PRIVATE_KEY

 const generateToken = (user) => {
    const token = jwk.sign({user}, keySing, {expiresIn: '48h'});
    return token;
}

 const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({message: 'Not authenticated'});
    }
    const token = authHeader.split(' ')[1];
    jwk.verify(token, keySing, (error, credentials) => {
        if(error){
            return res.status(401).send({message: 'Not authenticated'});
        }
        req.user = credentials;
        next();
    });
}

module.exports = { generateToken ,authToken };
