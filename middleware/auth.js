const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    var secret;
    if (process.env.NODE_ENV === 'production') {
        secret = process.env.secretJWT;
    } else {
        secret = require('../config/keys').secretJWT;
    }

    const token = req.header('x-auth-token');

    // Check for token
    if(!token) 
        return res.status(401).json({ msg: 'No token' });


    try {
        // Verify token
        const decoded = jwt.verify(token, secret);

        // Add user from payload
        req.user = decoded;
        next();

    } catch(e) {
        res.status(400).json({ msg: 'token is not valid' });
    }
} 

module.exports = auth;