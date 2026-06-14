const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Inscripcion } = require('../models');

const reglasInscripcion = [
  body('usuarioId').isInt().withMessage('Debe indicar el usuario'),
  body('actividadId').isInt().withMessage('Debe indicar la actividad'),
];

function validar(req, res, next) {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });
  next();
}

router.get('/', async (req, res) => {
  const inscripciones = await Inscripcion.findAll();
  res.json(inscripciones);
});

router.get('/:id', async (req, res) => {
  const inscripcion = await Inscripcion.findByPk(req.params.id);
  if (!inscripcion) return res.status(404).json({ error: 'Inscripción no encontrada' });
  res.json(inscripcion);
});

router.post('/', reglasInscripcion, validar, async (req, res) => {
  try {
    const nueva = await Inscripcion.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', reglasInscripcion, validar, async (req, res) => {
  const inscripcion = await Inscripcion.findByPk(req.params.id);
  if (!inscripcion) return res.status(404).json({ error: 'Inscripción no encontrada' });
  await inscripcion.update(req.body);
  res.json(inscripcion);
});

router.delete('/:id', async (req, res) => {
  const inscripcion = await Inscripcion.findByPk(req.params.id);
  if (!inscripcion) return res.status(404).json({ error: 'Inscripción no encontrada' });
  await inscripcion.destroy();
  res.status(204).send();
});

module.exports = router;
