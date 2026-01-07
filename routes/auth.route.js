/*
Route: /api/auth
*/
const { Router } = require('express');
const { login, googleSingIn, renewToken } = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.middlewares');
const { validarJWT } = require('../middlewares/validar-jwt.middlewares');

const route = Router();


route.post('/login',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], login);

route.post('/google',[
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos
], googleSingIn);


route.get('/renew',[
    validarJWT
], renewToken);



module.exports = route;