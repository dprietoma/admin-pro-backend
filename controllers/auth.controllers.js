const bcrypt = require("bcryptjs");
const { response } = require("express");

const Usuario = require("../models/usuario.model");
const { generarJwt } = require("../helpers/jwt.helpers");

const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;


    // Verificar si el email existe
    const userDB = await Usuario.findOne({ email });


    if (!userDB) {
      return res.status(404).json({
        msg: "Email not found",
      });
    }

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, userDB.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Invalid password",
      });
    }

    // Generar el JWT
    const token = await generarJwt(userDB.id);


    res.json({
      ok: true,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Contact the administrator",
    });
  }
};

module.exports = {
  login,
};
