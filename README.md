# App CNEISI
Sistema de gestión del Congreso Nacional de Estudiantes de Ingeniería en Sistemas de Información (CNEISI). Trabajo Práctico 4 — Desarrollo de Software, UTN FRSFCO 2026.

## Integrantes
- Mateo Novaresio
- Fabricio Cassineri

## Descripción
Aplicación web full stack para administrar inscriptos, el cronograma de actividades y el control de asistencia de un congreso universitario. Maneja tres perfiles de usuario con distintos niveles de acceso: Superadmin, Admin y Participante.

## Stack tecnológico
**Backend:** Node.js, Express, Sequelize, SQLite, JWT, bcrypt, express-validator.
**Frontend:** React (Vite), React Router, Context API, Tailwind CSS.

## Estructura del proyecto
app-cneisi/
├── backend/    API REST (Express + Sequelize + SQLite)
└── frontend/   Cliente web (React + Vite)

## Cómo levantar el proyecto
Se necesitan dos terminales, una para cada parte.
**Backend** (puerto 3000):

```bash
cd backend
npm install
npm run dev
```

**Frontend** (puerto 5173):

```bash
cd frontend
npm install
npm run dev
```

Luego abrir `http://localhost:5173` en el navegador.

> **Nota:** el backend requiere un archivo `.env` en su carpeta con la variable `JWT_SECRET`. No se sube al repositorio por seguridad, así que hay que crearlo manualmente.

## Entidades
Usuario, Evento, Actividad, Inscripción y Asistencia, con operaciones de alta, baja, modificación y consulta, y relaciones entre ellas.

## Funcionalidades principales
- Autenticación con JWT y contraseñas encriptadas (bcrypt).
- Control de acceso por rol en backend y frontend.
- ABM de charlas desde el panel de gestión.
- Inscripción y cancelación a charlas con control de cupo.
- Cronograma con buscador (filtrado por query params).
- Credencial digital del participante.

## Usuarios de prueba
| Email            | Contraseña | Rol          |
|------------------|------------|--------------|
| sofia@cneisi.org | cneisi2026 | superadmin   |
| juan@cneisi.org  | juan1234   | participante |
