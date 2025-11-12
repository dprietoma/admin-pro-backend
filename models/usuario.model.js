const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE'
  },
  google: {
    type: Boolean,
    default: false  
  }
});


UsuarioSchema.method('toJSON', function() {
  const { __v, password, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('Usuario', UsuarioSchema);