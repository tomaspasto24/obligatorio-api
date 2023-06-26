# AyudaYA API

Proyecto de la materia de Base de Datos 2 de la Universidad Católica del Uruguay. Realizado por los estudiantes: Tomás Silva, Juan Lupi y Rodrigo Jauregui.

## Descripción

AyudaYA es una aplicación web/móvil que permite a los usuarios registrados solicitar ayuda a otros usuarios registrados. La ayuda puede ser de cualquier tipo de habilidad que el usuario solicitante necesite. Por ejemplo, si un usuario necesita ayuda con matemáticas, puede solicitar ayuda a otro usuario que sepa de matemáticas. Este repositorio contiene el código del backend de la aplicación, una API REST desarrollada en Node.js con Express y PostgreSQL.

## Dependencias

Para ejecutar el proyecto, se requiere tener instalado Node.js y PostgreSQL. 

- Node.js: [página oficial](https://nodejs.org/es/)
- PostgreSQL: [página oficial](https://www.postgresql.org/download/)

## Instalación

Para instalar el proyecto, se debe clonar el repositorio. Navegue a la carpeta donde desea clonar el repositorio y ejecute el siguiente comando:

`git clone https://github.com/tomaspasto24/obligatorio-api.git`

Luego, navegue a la carpeta del proyecto:

`cd obligatorio-api`

Una vez dentro, instale las dependencias del proyecto:

`npm install`

## Base de datos

Para crear la base de datos, se debe ejecutar el script `database.sql` en PostgreSQL. Este script creará la base de datos y todas las tablas necesarias para el funcionamiento de la API. Se incluyen en el script los datos de prueba para la base de datos.

## Configuración

Ejecutar el proyecto requiere de 3 archivos: un archivo `.env`, un archivo de clave publica `public.key` y un archivo de clave privada `private.key`. Estos archivos deben estar en la carpeta raíz del proyecto. El archivo `.env` se puede obtener copiando el archivo `.env.example`, renombrandolo, y completando los valores de las variables de entorno. Las variables de entorno que deben ser completadas son las siguientes:

- API_HOSTNAME: El hostname del servidor donde se ejecutará la API.
- API_PORT: El puerto donde se ejecutará la API.
- API_CORS_ORIGIN=: El origen de las peticiones CORS.
- JWT_KEY_PASSPHRASE: La contraseña de la clave privada.
- DB_USER: El usuario de la base de datos.
- DB_HOST: El hostname de la base de datos.
- DB_DATABASE: El nombre de la base de datos.
- DB_PASSWORD: La contraseña de la base de datos.
- DB_PORT: El puerto de la base de datos.

La creacion de la clave privada se puede realizar con el siguiente comando:

`openssl genrsa -des3 -out private.pem 2048`

Luego, se debe generar la clave publica:

`openssl rsa -in private.pem -outform PEM -pubout -out public.pem`

Ambas claves se deben renombrar a `private.key` y `public.key` respectivamente.

## Compilación

Para ejecutar el proyecto, primero se debe compilar el código TypeScript a JavaScript. Esto se puede hacer con el siguiente comando:

`npm run build`

## Ejecución

Una vez compilado el código, se puede ejecutar el proyecto con el siguiente comando:

`npm run start`

Ya en ejecución, la API estará disponible en la URL `http://<API_HOSTNAME>:<API_PORT>/api`. Por ejemplo, si el hostname es `localhost` y el puerto es `3000`, la API estará disponible en `http://localhost:3000/api`.

## Documentación

Para obtener información de todos los endpoints disponibles, se puede acceder a la documentación de la API en la URL `http://<API_HOSTNAME>:<API_PORT>/api/docs`. Por ejemplo, si el hostname es `localhost` y el puerto es `3000`, la documentación estará disponible en `http://localhost:3000/api/docs`.

