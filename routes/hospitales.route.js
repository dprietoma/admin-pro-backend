/*
Route: /api/hospitales
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getHospitales, deleteHospitales, createHospitales, putHospitales } = require("../controllers/hospitales.controllers");
const { validarJWT } = require("../middlewares/validar-jwt.middlewares");
const { validarCampos } = require("../middlewares/validar-campos.middlewares");


const route = Router();

route.get("/", validarJWT, getHospitales);

route.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createHospitales
);

route.put("/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  putHospitales
);

route.delete("/:id", deleteHospitales);

module.exports = route;