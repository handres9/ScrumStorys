const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;

// parse requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to ZeptoBook Product app"});
});

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// listen on port 3000
app.listen(config.serverport, () => {
    console.log("Server is listening on port 3000");
});