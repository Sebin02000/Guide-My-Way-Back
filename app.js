const express = require('express');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();
const indexRouter = require('./src/index');
const apiResponse = require('./src/helpers/apiResponse');
const cors = require('cors');
const bodyParser = require('body-parser');
const handlebars =require('express-handlebars').engine

// DB connection
const MONGODB_URL = process.env.MONGODB_URL;
console.log(MONGODB_URL);
const mongoose = require('mongoose');
mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      // don't show the log when it is test
      if (process.env.NODE_ENV !== 'test') {
        console.log('Connected to %s', MONGODB_URL);
        console.log('App is running ... \n');
        console.log('Press CTRL + C to stop the process. \n');
      }
    })
    .catch((err) => {
      console.error('App starting error:', err.message);
      process.exit(1);
    });
// var db = mongoose.connection;

const app = express();

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// To allow cross-origin requests

// Route Prefixes
app.use('/api/', indexRouter);


// throw 404 if URL not found
app.all('*', function(req, res) {
  return apiResponse.notFoundResponse(res, 'Page not found');
});

app.use((err, req, res) => {
  if (err.name == 'UnauthorizedError') {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
});

module.exports = app;
