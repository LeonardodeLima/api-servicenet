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
    const user = await userController.getById(payload.sub);
    if (!user) {
        return done(null, true);
    }

    done();
};