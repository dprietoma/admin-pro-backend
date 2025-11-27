/*
Route: /api/uploads/
*/

const { Router } = require("express");

const expressFileUpload = require("express-fileupload");

const { validarJWT } = require("../middlewares/validar-jwt.middlewares");
const { cargarArchivo, mostrarImagenes } = require("../controllers/uploads.controllers");



const route = Router();

route.use(expressFileUpload());

route.put("/:tipo/:id", validarJWT, cargarArchivo);
route.get("/:tipo/:img", validarJWT, mostrarImagenes );


module.exports = route;