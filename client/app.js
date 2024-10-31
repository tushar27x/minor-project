require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
const bodyParser = require('body-parser');
const path = require('path');

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(express.static(path.join(__dirname, '/src/static'))); //  "public" off of current is root

// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./src/routes/home'))
app.use('/image', require('./src/routes/image'))
app.use('/platform/', require('./src/routes/platform'))
app.use('/standalone/', require('./src/routes/standalone'))
app.use('/update/', require('./src/routes/update'))
app.use('/recommend/', require('./src/routes/recommend'))
app.use('/job/', require('./src/routes/job'))

app.listen('3000', (req, res) => {
    console.log(`server started`)
})