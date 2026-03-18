
const jwt =  require('jsonwebtoken');
const Usuario = require('../models/usuario.model');


const validarJWT = (req, res, next) => {
   // Leer el token del header
    const token = req.header('x-token');

    
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY );
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

   
}


const validarRole = async(req, res, next) => {

    try {
        const uid = req.uid;
        const id = req.params.id;
        const usuarioDB = await Usuario.findById(uid);
        
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if ( usuarioDB.role === 'ADMIN_ROLE' || uid === id ) {
            next();
        } else {
          return res.status(403).json({
                ok: false,
                msg: 'No tiene permisos de administracion'
            });
        }
        
        


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}



module.exports = {
    validarJWT,
    validarRole
}