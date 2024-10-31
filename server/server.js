const express = require('express');
const app = express();

// Middleware utilities
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const path = require('path');

// Mongoose
const mongoose = require('mongoose');

// Config variables
require('dotenv').config();

//Connecting to the database
mongoose.promise = global.Promise;
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, db) => {
    if (err) console.log(err);
    else console.log('Database Connected...');
  }
);

// Getting data in json format
app.use(bodyParser.json());

// CORS
app.use(cors());

// Dev Middleware
app.use(morgan('dev'));

// Test route
app.get('/api', (req, res) => {
  res.json({
    message: 'API running'
  });
});

// Mounting the routes
app.use('/api/', require('./routes/index'));
app.use('/api/user', require('./routes/user'));
app.use('/api/util', require('./routes/util'));

// Starting the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
