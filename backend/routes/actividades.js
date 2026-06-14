const express = require('express');
const router = express.Router();
const { Actividad } = require('../models');

router.get('/', async (req, res) => {
  const actividades = await Actividad.findAll();
  res.json(actividades);
});

router.get('/:id', async (req, res) => {
  const actividad = await Actividad.findByPk(req.params.id);
  if (!actividad) return res.status(404).json({ error: 'Actividad no encontrada' });
  res.json(actividad);
});

router.post('/', async (req, res) => {
  try {
    const nueva = await Actividad.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const actividad = await Actividad.findByPk(req.params.id);
  if (!actividad) return res.status(404).json({ error: 'Actividad no encontrada' });
  await actividad.update(req.body);
  res.json(actividad);
});

router.delete('/:id', async (req, res) => {
  const actividad = await Actividad.findByPk(req.params.id);
  if (!actividad) return res.status(404).json({ error: 'Actividad no encontrada' });
  await actividad.destroy();
  res.status(204).send();
});

module.exports = router;
