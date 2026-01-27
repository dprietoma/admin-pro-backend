const bcrypt = require("bcryptjs");
const { response } = require("express");

const Usuario = require("../models/usuario.model");
const { generarJwt } = require("../helpers/jwt.helpers");
const { googleVerify } = require("../helpers/google-verify.helpers");

const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    // Verificar si el email existe
    const userDB = await Usuario.findOne({ email });

    if (!userDB) {
      return res.status(404).json({
        message: "Email no valido",
      });
    }

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, userDB.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // Generar el JWT
    const token = await generarJwt(userDB.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Contact the administrator",
    });
  }
};

const googleSingIn = async (req, res = response) => {
  try {
    const { email, name, picture } = await googleVerify(req.body.token);

    const usuarioDB = await Usuario.findOne({ email });
    let usuario;
    if (!usuarioDB) {
      // Si no existe el usuario
      usuario = new Usuario({
        nombre: name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      // Existe el usuario
      usuario = usuarioDB;
      usuario.google = true;
    }
    // Guardar en BD
    await usuario.save();

    // Generar el JWT
    const token = await generarJwt(usuario.id);

    res.json({
      ok: true,
      email,
      name,
      picture,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Token de Google no es correcto",
    });
  }
  
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  
  // Generar un nuevo JWT
  const token = await generarJwt(uid);   
  
  // Obtener el usuario por UID
  const usuario = await Usuario.findById( uid );
  
  res.json({
      ok: true,
      token,
      usuario
  });

}

module.exports = {
  login,
  googleSingIn,
  renewToken
};
