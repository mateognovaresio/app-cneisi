const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Actividad } = require('../models');
const { verificarToken, permitirRoles } = require('../middleware/auth');

const reglasActividad = [
  body('titulo').notEmpty().withMessage('El título es obligatorio'),
  body('inicio').isISO8601().withMessage('La fecha/hora de inicio no es válida'),
  body('cupo').isInt({ min: 0 }).withMessage('El cupo debe ser un número igual o mayor a 0'),
  body('eventoId').isInt().withMessage('Debe indicar a qué evento pertenece'),
];

function validar(req, res, next) {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });
  next();
}

router.get('/', async (req, res) => {
  const actividades = await Actividad.findAll();
  res.json(actividades);
});

router.get('/:id', async (req, res) => {
  const actividad = await Actividad.findByPk(req.params.id);
  if (!actividad) return res.status(404).json({ error: 'Actividad no encontrada' });
  res.json(actividad);
});

router.post('/', verificarToken, permitirRoles('admin', 'superadmin'), reglasActividad, validar, async (req, res) => {
  try {
    const nueva = await Actividad.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', verificarToken, permitirRoles('admin', 'superadmin'), reglasActividad, validar, async (req, res) => {
  const actividad = await Actividad.findByPk(req.params.id);
  if (!actividad) return res.status(404).json({ error: 'Actividad no encontrada' });
  await actividad.update(req.body);
  res.json(actividad);
});

router.delete('/:id', verificarToken, permitirRoles('admin', 'superadmin'), async (req, res) => {
  const actividad = await Actividad.findByPk(req.params.id);
  if (!actividad) return res.status(404).json({ error: 'Actividad no encontrada' });
  await actividad.destroy();
  res.status(204).send();
});

module.exports = router;
