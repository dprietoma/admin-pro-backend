/*
Route: /api/usuarios
*/

const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUsuarios,
  createUsuarios,
  putUsuarios,
  deleteUsuario,
} = require("../controllers/usuarios.controllers");
const { validarCampos } = require("../middlewares/validar-campos.middlewares");
const { validarJWT } = require("../middlewares/validar-jwt.middlewares");

const route = Router();

route.get("/", validarJWT, getUsuarios);

route.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({min: 6,}),
    validarCampos,
  ],
  createUsuarios
);

route.put("/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El role es obligatorio").isEmpty(),
    validarCampos,
  ],
  putUsuarios
);

route.delete("/:id", deleteUsuario);

module.exports = route;
