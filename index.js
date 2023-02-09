const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const indexRoute = require('./routes/index');
const studentsRoute = require('./routes/students');

const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;

mongoose.connect(databaseUrl);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Connected to the Database');
});

const app = express();

app.use(express.json());
app.use('/', indexRoute);
app.use('/students', studentsRoute);

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});