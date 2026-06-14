const express = require('express');
const router = express.Router();
const { Inscripcion } = require('../models');

router.get('/', async (req, res) => {
  const inscripciones = await Inscripcion.findAll();
  res.json(inscripciones);
});

router.get('/:id', async (req, res) => {
  const inscripcion = await Inscripcion.findByPk(req.params.id);
  if (!inscripcion) return res.status(404).json({ error: 'Inscripción no encontrada' });
  res.json(inscripcion);
});

router.post('/', async (req, res) => {
  try {
    const nueva = await Inscripcion.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
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
