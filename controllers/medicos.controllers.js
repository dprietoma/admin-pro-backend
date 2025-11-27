const { response } = require("express");

const Medico = require("../models/medicos.model");
const { generarJwt } = require("../helpers/jwt.helpers");


const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
  .populate("usuario", "nombre img")
  .populate("hospital", "nombre img");

  res.status(200).json({
    ok: true,
    medicos,
  });
};

const createMedicos = async (req, res = response) => {
  const uid = req.uid;

  const medico = new Medico({ 
    usuario: uid,...req.body 
  });

  try {
    // Guardar usuario
    const medicoGuardado = await medico.save();
    
    const token = await generarJwt(medico.id);
    
    res.status(201).json({
      ok: true,
      medico: medicoGuardado,
      token,
      mesage: "Medico creado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error inesperado... revisar logs",
    });
  }
};

const putMedicos = async (req, res = response) => {
  const udi = req.params.id;

  try {
    const medico = await Medico.findById(udi);
    if (!medico) {
      return res.status(404).json({
        ok: false,
        message: "Medico no encontrado por id",
      });
    }

    // Actualizaciones
    const { nombre, img, ...campos } = req.body;

    if (medico.nombre !== nombre) {
      const existeNombre = await Medico.findOne({ nombre });
      if (existeNombre) {
        return res.status(400).json({
          ok: false,
          message: "Ya existe un medico con ese nombre",
        });
      }
    }

    campos.nombre = nombre;
    campos.img = img;

    const medicoActualizado = await Medico.findByIdAndUpdate(udi, campos, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      usuario: medicoActualizado,
      message: "Medico actualizado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error inesperado... revisar logs",
    });
  }
};

const deleteMedicos = async (req, res = response) => {
  const udi = req.params.id;
  try {
    const medico = await Medico.findById(udi);
    if (!medico) {
      return res.status(404).json({
        ok: false,
        message: "No existe un medico con ese id",
      });
    }
    
    await Medico.findByIdAndDelete(udi);
    res.status(200).json({
      ok: true,
      message: "Medico eliminado exitosamente",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error inesperado... revisar logs",
    });
  }
}



module.exports = {
  getMedicos,
  createMedicos,
  putMedicos,
  deleteMedicos
}