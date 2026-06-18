 Backend — App CNEISI

API REST para el sistema de gestión del congreso universitario CNEISI. Desarrollada con Node.js, Express y Sequelize sobre una base de datos SQLite.


 Tecnologías utilizadas

TecnologíaVersiónUsoNode.js≥ 18RuntimeExpress^5.2.1Framework HTTPSequelize—ORMSQLite—Base de datosJSON Web Token (JWT)—Autenticaciónbcryptjs^3.0.3Hash de contraseñasexpress-validator^7.3.2Validación de datosnodemon^3.1.14Recarga en desarrollo


 Estructura del proyecto

backend/
├── config/
│   └── database.js          # Configuración de Sequelize + SQLite
├── middleware/
│   └── auth.js              # verificarToken y permitirRoles
├── models/
│   ├── index.js             # Relaciones entre modelos
│   ├── Usuario.js
│   ├── Evento.js
│   ├── Actividad.js
│   ├── Inscripcion.js
│   └── Asistencia.js
├── routes/
│   ├── auth.js              # POST /auth/login
│   ├── usuarios.js
│   ├── eventos.js
│   ├── actividades.js
│   ├── inscripciones.js
│   └── asistencias.js
├── index.js                 # Entry point
└── package.json


 Variables de entorno

Crear un archivo .env en la raíz del directorio backend/ con el siguiente contenido:

envJWT_SECRET=tu_clave_secreta_aqui


 El archivo .env no debe subirse al repositorio. Está incluido en .gitignore.




 Instalación y ejecución

bash# 1. Moverse al directorio del backend
cd backend

# 2. Instalar dependencias
npm install

# 3. Crear el archivo .env (ver sección anterior)

# 4. Iniciar en modo desarrollo (con recarga automática)
npm run dev

# O iniciar en modo producción
node index.js

El servidor levanta en http://localhost:3000.


 Base de datos

Se utiliza SQLite con el archivo cneisi.sqlite generado automáticamente en la raíz del proyecto al iniciar el servidor. Sequelize sincroniza y crea las tablas al arrancar (sequelize.sync({ alter: true })), por lo que no es necesario correr migraciones manualmente.

Modelos y relaciones

Evento  ──< Actividad ──< Inscripcion >── Usuario
                               │
                           Asistencia


Un Evento tiene muchas Actividades.
Un Usuario puede tener muchas Inscripciones.
Una Actividad puede tener muchas Inscripciones.
Una Inscripcion tiene una Asistencia.



 Autenticación

La API usa JWT Bearer Token. Para acceder a rutas protegidas, incluir el token en el header:

Authorization: Bearer <token>

Roles disponibles

RolDescripciónsuperadminAcceso totaladminGestión del congresoparticipanteUsuario estándar


📡 Endpoints disponibles

MétodoRutaDescripciónGET/Health checkPOST/auth/loginIniciar sesión, devuelve JWTGET/POST/.../usuariosCRUD de usuariosGET/POST/.../eventosCRUD de eventosGET/POST/.../actividadesCRUD de actividadesGET/POST/.../inscripcionesCRUD de inscripcionesGET/POST/.../asistenciasCRUD de asistencias


🧪 Ejemplo de login

Request:

httpPOST /auth/login
Content-Type: application/json

{
  "email": "admin@cneisi.com",
  "password": "tu_password"
}

Response:

json{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "Admin",
    "email": "admin@cneisi.com",
    "rol": "admin"
  }
}

El token tiene una duración de 5 horas.

 Integrantes

Proyecto desarrollado como Trabajo Práctico 4 para la materia correspondiente en la UTN.

👥 Integrantes

Proyecto desarrollado como Trabajo Práctico 4 para la materia correspondiente en la UTN.
