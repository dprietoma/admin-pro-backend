const { response } = require("express");

const Hospital = require("../models/hospital.model");
const { generarJwt } = require("../helpers/jwt.helpers");

const getHospitales = async (req, res = response) => {
  const hospitales = await Hospital.find()
    .populate("usuario", "nombre img");

  res.status(200).json({
    ok: true,
    hospitales
  });
};

const createHospitales = async (req, res = response) => {
  const { nombre } = req.body;
  const uid = req.uid;
  const hospital = new Hospital({ 
    usuario: uid,
    ...req.body 
  });

  try {
    const existeNombre = await Hospital.findOne({ nombre });
    if (existeNombre) {
      return res.status(400).json({
        ok: false,
        message: "El nombre ya está registrado",
      });
    }


    
    // Guardar usuario
    const hospitalGuardado = await hospital.save();
    
    const token = await generarJwt(hospital.id);
    
    res.status(201).json({
      ok: true,
      hospital: hospitalGuardado,
      token,
      mesage: "Hospital creado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error inesperado... revisar logs",
    });
  }
};

const putHospitales = async (req, res = response) => {
  const udi = req.params.id;

  try {
    const hospital = await Hospital.findById(udi);
    if (!hospital) {
      return res.status(404).json({
        ok: false,
        message: "Hospital no encontrado por id",
      });
    }

    // Actualizaciones
    const { nombre, img, ...campos } = req.body;

    if (hospital.nombre !== nombre) {
      const existeNombre = await Hospital.findOne({ nombre });
      if (existeNombre) {
        return res.status(400).json({
          ok: false,
          message: "Ya existe un hospital con ese nombre",
        });
      }
    }

    campos.nombre = nombre;
    campos.img = img;

    const hospitalActualizado = await Hospital.findByIdAndUpdate(udi, campos, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      usuario: hospitalActualizado,
      message: "Hospital actualizado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error inesperado... revisar logs",
    });
  }
};

const deleteHospitales = async (req, res = response) => {
  const udi = req.params.id;
  try {
    const hospital = await Hospital.findById(udi);
    if (!hospital) {
      return res.status(404).json({
        ok: false,
        message: "No existe un hospital con ese id",
      });
    }
    
    await Hospital.findByIdAndDelete(udi);
    res.status(200).json({
      ok: true,
      message: "Hospital eliminado exitosamente",
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
  getHospitales,
  createHospitales,
  putHospitales,
  deleteHospitales
}