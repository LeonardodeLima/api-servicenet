require('rootpath')();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config(); 
const jwt = require('./src/_helpers/jwt');
const errorHandler = require('./src/_helpers/error-handler');
const bodyParser = require('body-parser');

const userRoute = require('./src/routers/user.route');
const clientRoute = require('./src/routers/client.route');
   
  const PORT = process.env.PORT || 4000;
  const DATABASE = process.env.DATABASE_URL;

  mongoose.Promise = global.Promise;
  mongoose.connect(DATABASE, { useNewUrlParser: true }).then( () => {
    console.log('Database is connected');
    }, err => { 
    console.log("Can't connect to the database"+ err)}
  );


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());


//rotas
app.use('/user', userRoute);
app.use('/client', clientRoute);

app.get('/status', function(req, res, next) {
  res.status(202).send({ status:"ON" });
 return next();
});

app.use(errorHandler);


app.listen(PORT, function(){ 
    console.log('Server is running on:', PORT ); 
  }).on('error', function(err) { 
    console.log('Server is stopped, error:', err);
});