const { response } = require("express");
const Usuario = require("../models/usuario.model");
const Medicos = require("../models/medicos.model");
const Hospitales = require("../models/hospital.model");

const getFiltros = async (req, res = response) => {
  const busqueda = req.params.busqueda;

  try {
    const regex = new RegExp(busqueda, "i");
    const [usuarios, medicos, hospitales] = await Promise.all([
      Usuario.find({ nombre: regex, email: regex }),
      Medicos.find({ nombre: regex }),
      Hospitales.find({ nombre: regex }),
    ]);
    res.status(200).json({
      ok: true,
      usuarios,
      medicos,
      hospitales,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error inesperado... revisar logs",
    });
  }
};

const getFiltrosColeccion = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");
  let data = [];
  try {
    switch (tabla) {
      case "medicos":
        data = await Medicos.find({ nombre: regex });
        break;
      case "hospitales":
        data = await Hospitales.find({ nombre: regex });
        break;
      case "usuarios":
        data = await Usuario.find({ nombre: regex, email: regex });
        break;
      default:
        return res.status(400).json({
          ok: false,
          message: "La tabla tiene que ser usuarios/medicos/hospitales",
        });
    }

    res.status(200).json({
      ok: true,
      resultados: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error inesperado... revisar logs",
    });
  }
};

module.exports = {
  getFiltros,
  getFiltrosColeccion,
};
