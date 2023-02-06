1.- Iniciar el proyecto con npm init -y
2.- Instalar dependencias express sequelize pg pg-hstore cors dotenv
3.- Instalar dependencias de desarrollo
npm i nodemon morgan -D
4.- Estructura de carpetas
    /src
    --- /services
    --- /controllers
    --- /routes
    --- /middlewares
    --- /seeders
    --- /tests
    --- /utils
    --- /templates
        app.js
        server.js

5.- Scripts, start, dev en package.json
6.- Crear un server basico app.js y server.js
7.- Configurar la conexion a la DB
8.- Autenticar la BD en app.js
9.- Crear un modelo generico de usuario
10.- Crear el init models
11.- Sincronizar la DB
12.- Registrar usuarios --> Creacion de usuarios
    "1234" --> encriptar contrase;as
13.- Autenticacion con el login