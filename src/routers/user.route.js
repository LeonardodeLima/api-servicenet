const express = require('express');
const userRoutes = express.Router();

const  userController =  require("../controllers/userController");

userRoutes.get('/list', userController.list );
userRoutes.get('/show/:id', userController.show );
userRoutes.post('/create', userController.add);
userRoutes.put('/update/:id', userController.update );
userRoutes.delete('/delete/:id', userController.delete );
userRoutes.post('/login', userController.login);

module.exports = userRoutes;
