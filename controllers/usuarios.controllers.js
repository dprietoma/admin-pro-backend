const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const { response } = require("express");

const { generarJwt } = require("../helpers/jwt.helpers");

const getUsuarios = async (req, res = response) => {

  const desde = Number(req.query.desde) || 0;

  const[usuarios,total] = await Promise.all([
    Usuario.find()
      .skip(desde)
      .limit(5),
    
    Usuario.countDocuments()
  ]);

  res.status(200).json({
    ok: true,
    usuarios,
    total
  });
};

const createUsuarios = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        message: "El correo ya está registrado",
      });
    }

    const usuario = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    
    // Guardar usuario
    await usuario.save();
    
    const token = await generarJwt(usuario.id);
    
    res.status(201).json({
      ok: true,
      usuario,
      token,
      mesage: "Usuario creado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error inesperado... revisar logs",
    });
  }
};

const putUsuarios = async (req, res = response) => {
  const udi = req.params.id;

  try {
    const usuario = await Usuario.findById(udi);
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado por id",
      });
    }

    // Actualizaciones
    const { password, email, google, ...campos } = req.body;

    if (usuario.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          message: "Ya existe un usuario con ese email",
        });
      }
    }

    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(udi, campos, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      usuario: usuarioActualizado,
      message: "Usuario actualizado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error inesperado... revisar logs",
    });
  }
};

const deleteUsuario = async (req, res = response) => {
  const udi = req.params.id;
  try {
    const usuario = await Usuario.findById(udi);
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        message: "No existe un usuario con ese id",
      });
    }
    
    await Usuario.findByIdAndDelete(udi);
    res.status(200).json({
      ok: true,
      message: "Usuario eliminado exitosamente",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error inesperado... revisar logs",
    });
  }
}






module.exports = {
  getUsuarios,
  createUsuarios,
  putUsuarios,
  deleteUsuario
};
