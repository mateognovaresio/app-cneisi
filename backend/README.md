# Backend — App CNEISI

API REST para el sistema de gestión del congreso universitario CNEISI. Desarrollada con **Node.js**, **Express** y **Sequelize** sobre una base de datos **SQLite**.

---

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | ≥ 18 | Runtime |
| Express | ^5.2.1 | Framework HTTP |
| Sequelize | — | ORM |
| SQLite | — | Base de datos |
| JSON Web Token (JWT) | — | Autenticación |
| bcryptjs | ^3.0.3 | Hash de contraseñas |
| express-validator | ^7.3.2 | Validación de datos |
| nodemon | ^3.1.14 | Recarga en desarrollo |

---

## Estructura del proyecto

```
backend/
├── config/
│   └── database.js
├── middleware/
│   └── auth.js
├── models/
│   ├── index.js
│   ├── Usuario.js
│   ├── Evento.js
│   ├── Actividad.js
│   ├── Inscripcion.js
│   └── Asistencia.js
├── routes/
│   ├── auth.js
│   ├── usuarios.js
│   ├── eventos.js
│   ├── actividades.js
│   ├── inscripciones.js
│   └── asistencias.js
├── index.js
└── package.json
```

---

## Variables de entorno

Crear un archivo `.env` en la raíz del directorio `backend/` con el siguiente contenido:

```env
JWT_SECRET=tu_clave_secreta_aqui
```

> El archivo `.env` no debe subirse al repositorio. Está incluido en `.gitignore`.

---

## Instalación y ejecución

```bash
# 1. Moverse al directorio del backend
cd backend

# 2. Instalar dependencias
npm install

# 3. Crear el archivo .env (ver sección anterior)

# 4. Iniciar en modo desarrollo
npm run dev

# O iniciar en modo producción
node index.js
```

El servidor levanta en `http://localhost:3000`.

---

## Base de datos

Se utiliza **SQLite** con el archivo `cneisi.sqlite` generado automáticamente al iniciar el servidor. Sequelize sincroniza y crea las tablas al arrancar, por lo que no es necesario correr migraciones manualmente.

### Modelos y relaciones

- Un `Evento` tiene muchas `Actividad`es.
- Un `Usuario` puede tener muchas `Inscripcion`es.
- Una `Actividad` puede tener muchas `Inscripcion`es.
- Una `Inscripcion` tiene una `Asistencia`.

---

## Autenticación

La API usa **JWT Bearer Token**. Para acceder a rutas protegidas, incluir el token en el header:

```
Authorization: Bearer <token>
```

### Roles disponibles

| Rol | Descripción |
|---|---|
| `superadmin` | Acceso total |
| `admin` | Gestión del congreso |
| `participante` | Usuario estándar |

---

## Endpoints disponibles

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/auth/login` | Iniciar sesión, devuelve JWT |
| `GET/POST/...` | `/usuarios` | CRUD de usuarios |
| `GET/POST/...` | `/eventos` | CRUD de eventos |
| `GET/POST/...` | `/actividades` | CRUD de actividades |
| `GET/POST/...` | `/inscripciones` | CRUD de inscripciones |
| `GET/POST/...` | `/asistencias` | CRUD de asistencias |

---

## Ejemplo de login

**Request:**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@cneisi.com",
  "password": "tu_password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "Admin",
    "email": "admin@cneisi.com",
    "rol": "admin"
  }
}
```

El token tiene una duración de **5 horas**.
