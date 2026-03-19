const express = require('express');
require('dotenv').config();
// const path = require('path');

const { dbConnetionString } = require('./dataBase/config');
const cors = require('cors')

const app = express();

// Connect to the database
dbConnetionString();

// CORS
app.use(cors());

// ✅ COOP para permitir popups (Google login / postMessage)
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

// Carpetas públicas
// app.use( express.static('public') );

// Lectura y parseo del body
app.use(express.json());



// Routes
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/hospitales', require('./routes/hospitales.route'));
app.use('/api/medicos', require('./routes/medicos.route'));
app.use('/api/todos', require('./routes/filtros.route'));
app.use('/api/uploads', require('./routes/uploads.route'));


// app.get('/*splat', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'public/index.html'));
// });

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});


