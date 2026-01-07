# 🏥 AdminPro – Backend

## 📌 Descripción del proyecto

Este repositorio contiene el Backend del proyecto AdminPro – Hospitales, desarrollado con Node.js y Express, encargado de la autenticación, gestión de usuarios, hospitales, médicos y carga de archivos, así como la validación de seguridad mediante JWT y login con Google.

El backend se conecta a MongoDB Atlas, utilizando MongoDB Compass como herramienta de apoyo para la administración y visualización de la base de datos.

## 🚀 Puesta en marcha del proyecto

* Clonar el repositorio

* Instalar dependencias: `npm install`

* Asegurarse de tener MongoDB Compass disponible y la conexión configurada hacia MongoDB Atlas

* Ejecutar el proyecto en entorno de desarrollo: `npm run start:dev`

## 🧰 Tecnologías y dependencias principales

* Node.js

* Express

* MongoDB Atlas

* MongoDB Compass

* Mongoose

* CORS

* JWT (JSON Web Token)

* express-fileupload

* uuid@8.3.2

* Google Identity (login con Google)

## 🔐 Seguridad y autenticación

* Implementación de JWT para la validación y protección de los servicios

* Autenticación tradicional (usuario / contraseña)

* Login con Google, utilizando la documentación oficial de Google Identity Services

* Validación de tokens mediante middlewares


## 📂 Arquitectura del proyecto

El backend está organizado siguiendo una estructura clara y escalable:

* routes/
Definición de las rutas de cada uno de los servicios expuestos por la API.

* controllers/
Contiene la lógica de negocio de cada servicio.

* middlewares/
Validadores de campos y validación de tokens JWT.

* helpers/
Funciones auxiliares, principalmente relacionadas con la generación y validación de tokens.

* models/
Modelos de datos definidos con Mongoose.

* uploads/
Carpeta donde se almacenan los archivos cargados, organizados por tipo de entidad (usuarios, médicos, hospitales, etc.).

## 📸 Carga de archivos

* Implementación de express-fileupload para la carga de archivos

* Organización de imágenes en la carpeta uploads/

* Uso de UUID para generar identificadores únicos de las imágenes y evitar colisiones

## 🏷️ Versionado

El proyecto cuenta con tags de release, los cuales deben ser tenidos en cuenta para el seguimiento de versiones y cambios importantes.

## 📝 Notas adicionales

El login con Google utiliza una librería externa basada en la documentación oficial.
Aunque la documentación no está completamente actualizada, la implementación funciona correctamente.

## 🗂️ Estructura del proyecto (Backend)

El backend está organizado siguiendo una arquitectura por capas, separando responsabilidades para facilitar el mantenimiento, la escalabilidad y la lectura del código.

📁 controllers/

Contiene la lógica de negocio de la aplicación. Cada archivo maneja las operaciones principales de un recurso específico:

* auth.controllers.js → autenticación (login normal y Google)

* usuarios.controllers.js → gestión de usuarios

* hospitales.controllers.js → gestión de hospitales

* medicos.controllers.js → gestión de médicos

* uploads.controllers.js → carga y actualización de imágenes

* filtros.controllers.js → búsquedas y filtros generales

📁 routes/

Define las rutas de la API y enlaza cada endpoint con su respectivo controller:

* auth.route.js

* usuarios.route.js

* hospitales.route.js

* medicos.route.js

* uploads.route.js

* filtros.route.js

📁 models/

Modelos de datos definidos con Mongoose, que representan las colecciones de MongoDB:

* usuario.model.js

* hospital.model.js

* medico.model.js

📁 middlewares/

Middlewares reutilizables para validaciones y seguridad:

* validar-campos.middlewares.js → validación de campos (express-validator)

* validar-jwt.middlewares.js → validación de tokens JWT

📁 helpers/

Funciones auxiliares que apoyan la lógica del backend:

* google-verify.helpers.js → verificación del token de Google

* jwt.helpers.js → generación y validación de JWT

* actualizar-img.helpers.js → lógica para actualizar imágenes asociadas a entidades

📁 dataBase/

Configuración de la base de datos:

* config.js → conexión a MongoDB Atlas usando Mongoose

📁 uploads/

Almacenamiento de archivos subidos al servidor, organizados por entidad:

* usuarios/

* hospitales/

* medicos/

* no-img.jpg → imagen por defecto

📁 public/

Archivos públicos del servidor:

* index.html

## Otros archivos importantes

.env → variables de entorno (puerto, strings de conexión, claves)

index.js → punto de entrada de la aplicación Express

.gitignore → archivos ignorados por Git

package.json / package-lock.json → dependencias y scripts del proyecto