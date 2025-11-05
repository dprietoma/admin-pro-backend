const express = require('express');
require('dotenv').config();

const { dbConnetionString } = require('./dataBase/config');
const cors = require('cors')

const app = express();

// Connect to the database
dbConnetionString();

// CORS
app.use(cors());


app.get('/', (req, res) => {
  res.status(400).json({ 
    ok: true,
    msg: 'Hello, World!' });
});


app.listen(process.env.PORT, () => {
  console.log('Server is running on port', process.env.PORT);
});


// mongodb+srv://davidfelipeprieto_db_user:Il7qgUYBErgZdVt5@adminpro0.icuikqn.mongodb.net/