# Admmin pro BACKEND

Descripcion del proyecto

* Si se clona el proyecto no olvidar dar npm i
* Para levantar el proyecto se debe tirar el comando npm run start:dev
* Aqui va estar el Backend del proyecto Adminpro - Hospitales
* Este Backend esta configurado con mongo db atlas y Mongo compass es el encargado de la conexion
* Tambien se encuentran instaladas las dependencias de CORS,MONGOOSE,JWT 
* Importante tener en cuenta los tags de release del proyecto 
* Tenemos implementacion de JWT para la validadcion de los servicios 
* La arquitectura del proyecto esta divida de la siguiente forma 
* routes: estan nuestras rutas de cada uno de los servicios
* controllers: esta la logica de nuestros servicios
* helpers: logica del token
* middlewares: validadores de campos y del token
* models: los modelos de nuestro backend
* Para la carga de archivos se implementa la libreria de npm i express-fileupload
* Se crea una carpeta uploads en la cual se guardan los tipos de cada grupo de imagenes 
* Para el amnejo del id de las imagenes se implemento esta libreria npm install uuid@8.3.2