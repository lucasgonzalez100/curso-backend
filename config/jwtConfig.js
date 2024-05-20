const jwk = require('jsonwebtoken');

const PRIVATE_KEY = 'C0d3rh0us3';

 const generateToken = (user) => {
    const token = jwk.sign({user}, PRIVATE_KEY, {expiresIn: '24h'});
    return token;
}

 const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({message: 'Not authenticated'});
    }
    const token = authHeader.split(' ')[1];
    jwk.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error){
            return res.status(401).send({message: 'Not authenticated'});
        }
        req.user = credentials;
        next();
    });
}

module.exports = { generateToken ,authToken };
