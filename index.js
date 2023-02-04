// APP variables
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const routes= require('./routes/routes');


// DB Variables
const port = process.env.PORT || 5000;
const databaseUrl = process.env.DATABASE_URL;


//Connect to the database
mongoose.connect(databaseUrl);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Connected to the Database');
});

//Express APP
const app = express();

app.use(express.json());
app.use('/', routes);


app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});