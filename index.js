const express = require('express');
require('dotenv').config();

const { dbConnetionString } = require('./dataBase/config');
const cors = require('cors')

const app = express();

// Connect to the database
dbConnetionString();

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());



// Routes
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/auth', require('./routes/auth.route'));


app.listen(process.env.PORT, () => {
  console.log('Server is running on port', process.env.PORT);
});


// mongodb+srv://davidfelipeprieto_db_user:Il7qgUYBErgZdVt5@adminpro0.icuikqn.mongodb.net/