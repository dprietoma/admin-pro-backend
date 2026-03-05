/*
Route: /api/medicos
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos.middlewares");
const { validarJWT } = require("../middlewares/validar-jwt.middlewares");
const { getMedicos, createMedicos, putMedicos, deleteMedicos, getMedicoById } = require("../controllers/medicos.controllers");

const route = Router();

route.get("/", validarJWT, getMedicos);

route.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("hospital", "El hospital es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createMedicos
);

route.put("/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  putMedicos
);
    
route.delete("/:id",validarJWT, deleteMedicos);

route.get("/:id",validarJWT, getMedicoById);

module.exports = route;
