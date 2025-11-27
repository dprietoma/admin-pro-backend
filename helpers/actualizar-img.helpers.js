const fs = require("fs");

const Usuario = require("../models/usuario.model");
const Medicos = require("../models/medicos.model");
const Hospitales = require("../models/hospital.model");

const borrarPathViejo = (path) => {
  // Si existe, elimina la imagen anterior
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {

  let pathViejo = '';
  // Lógica para actualizar la imagen en la base de datos o sistema de almacenamiento
  switch (tipo) {
    case "usuarios":
      // Actualizar imagen para usuarios
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log("No se encontró un usuario con ese ID");
        return false;
      }

      pathViejo = `./uploads/usuarios/${usuario.img}`;

      borrarPathViejo(pathViejo);

      usuario.img = nombreArchivo;
      await usuario.save();
      return true;
      break;
    case "medicos":
      // Actualizar imagen para medicos
      const medico = await Medicos.findById(id);
      if (!medico) {
        console.log("No se encontró un medicos con ese ID");
        return false;
      }

      pathViejo = `./uploads/medicos/${medico.img}`;

      borrarPathViejo(pathViejo);

      medico.img = nombreArchivo;
      await medico.save();
      return true;
      break;
    case "hospitales":
      // Actualizar imagen para hospitales
      const hospital = await Hospitales.findById(id);
      if (!hospital) {
        console.log("No se encontró un hospitales con ese ID");
        return false;
      }

      pathViejo = `./uploads/hospitales/${hospital.img}`;

      borrarPathViejo(pathViejo);

      hospital.img = nombreArchivo;
      await hospital.save();
      return true;
      break;
    default:
      break;
  }
  // según el tipo (usuarios, medicos, hospitales) y el id proporcionado.
  // Esta función es un placeholder y debe ser implementada según los requisitos específicos.
  console.log(
    `Actualizar imagen para ${tipo} con ID ${id} al archivo ${nombreArchivo}`
  );
};

module.exports = {
  actualizarImagen,
};
