const expressJwt = require('express-jwt');
require('dotenv').config(); 
const userController = require('../controllers/userController');

module.exports = jwt;

function jwt() {
    const secret = process.env.SECRET;
    console.log("jwt", secret);
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            '/user/login',
            '/user/create',
            '/status'
        ]
    });
}

async function isRevoked(req, payload, done) {
    // console.log("isRevoked",payload);
    const user = await userController.getById(payload.sub);
    console.log("user",user);
    if (!user) {
        return done(null, true);
    }

    done();
};