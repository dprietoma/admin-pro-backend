/*
Route: /api/todos/
*/

const { Router } = require("express");

const { validarJWT } = require("../middlewares/validar-jwt.middlewares");
const { getFiltros, getFiltrosColeccion } = require("../controllers/filtros.controllers");


const route = Router();

route.get("/:busqueda", validarJWT, getFiltros);
route.get("/coleccion/:tabla/:busqueda", validarJWT, getFiltrosColeccion);

module.exports = route;