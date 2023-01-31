// APP variables
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();



// DB Variables
const port = process.env.PORT || 3000;
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


app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});