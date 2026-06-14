const express = require('express');
const router = express.Router();
const { Asistencia } = require('../models');

router.get('/', async (req, res) => {
  const asistencias = await Asistencia.findAll();
  res.json(asistencias);
});

router.get('/:id', async (req, res) => {
  const asistencia = await Asistencia.findByPk(req.params.id);
  if (!asistencia) return res.status(404).json({ error: 'Asistencia no encontrada' });
  res.json(asistencia);
});

router.post('/', async (req, res) => {
  try {
    const nueva = await Asistencia.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const asistencia = await Asistencia.findByPk(req.params.id);
  if (!asistencia) return res.status(404).json({ error: 'Asistencia no encontrada' });
  await asistencia.update(req.body);
  res.json(asistencia);
});

router.delete('/:id', async (req, res) => {
  const asistencia = await Asistencia.findByPk(req.params.id);
  if (!asistencia) return res.status(404).json({ error: 'Asistencia no encontrada' });
  await asistencia.destroy();
  res.status(204).send();
});

module.exports = router;
