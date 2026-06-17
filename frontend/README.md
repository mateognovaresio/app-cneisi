# App CNEISI — Frontend

Cliente web del sistema de gestión del Congreso Nacional de Estudiantes de
Ingeniería en Sistemas de Información (CNEISI). Desarrollado con React y Vite,
estilado con Tailwind CSS.

## Requisitos

- Node.js 18 o superior
- npm
- El backend debe estar corriendo (ver el README de la carpeta `backend`).

## Instalación

1. Entrar a la carpeta del frontend:

```bash
   cd app-cneisi/frontend
```

2. Instalar las dependencias:

```bash
   npm install
```

## Cómo levantar la app

```bash
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`. Requiere que el
backend esté corriendo en `http://localhost:3000`.

## Funcionalidades

- Inicio de sesión con email y contraseña, validando contra el backend.
- Sesión persistente (se mantiene al recargar la página).
- Navegación con rutas y control de acceso según el rol del usuario.
- **Participante**: visualiza el cronograma de actividades.
- **Admin / Superadmin**: accede al panel de gestión con ABM de charlas
  (crear, editar y eliminar).

## Tecnologías

- React (con Vite)
- react-router-dom (navegación)
- useContext (estado global de sesión)
- Tailwind CSS (estilos)

## Usuarios de prueba

| Email              | Contraseña  | Rol         |
|--------------------|-------------|-------------|
| sofia@cneisi.org   | cneisi2026  | superadmin  |
| juan@cneisi.org    | juan1234    | participante|
