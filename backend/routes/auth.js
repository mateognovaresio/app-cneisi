const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Usuario } = require('../models');

const reglasLogin = [
  body('email').isEmail().withMessage('El email no es válido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

router.post('/login', reglasLogin, async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  const coincide = await usuario.compararPassword(password);

  if (!coincide) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  res.json({
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
  });
});

module.exports = router;
