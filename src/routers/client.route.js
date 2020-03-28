const express = require('express');
const clietRoutes = express.Router();

const  clientController =  require("../controllers/clientController");

clietRoutes.get('/list', clientController.list );
clietRoutes.get('/show/:id', clientController.show );
clietRoutes.post('/create', clientController.add );
clietRoutes.put('/update/:id', clientController.update );
clietRoutes.delete('/delete/:id', clientController.delete );
clietRoutes.get('/search/:key', clientController.search );

module.exports = clietRoutes;
