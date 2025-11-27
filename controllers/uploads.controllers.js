const { response } = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-img.helpers");

const cargarArchivo = async (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "Tipo no válido",
    });
  }

  // Validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningún archivo.",
    });
  }

  const file = req.files.imagen;
  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];
  // Validar extensión
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extensión permitida",
    });
  }

  // Generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  // Path para guardar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  // Mover la imagen

  file.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen",
      });
    }

    actualizarImagen(tipo, id, nombreArchivo);

    res.status(200).json({
      ok: true,
      message: "Archivo Cargado",
      nombreArchivo,
    });
  });
};


const mostrarImagenes = (req ,res = response) => {
  const tipo = req.params.tipo;
  const img = req.params.img;


  const pathImg = path.join( __dirname, `../uploads/${tipo}/${img}`);

  // validar imagen por defecto

  if ( fs.existsSync(pathImg) ) {
    res.sendFile(pathImg)
  } else {
    const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg)
  }
}

module.exports = {
  cargarArchivo,
  mostrarImagenes
};
