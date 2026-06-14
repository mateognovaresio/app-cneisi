const express = require('express');
const router = express.Router();
const { Evento } = require('../models');

router.get('/', async (req, res) => {
  const eventos = await Evento.findAll();
  res.json(eventos);
});

router.get('/:id', async (req, res) => {
  const evento = await Evento.findByPk(req.params.id);
  if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
  res.json(evento);
});

router.post('/', async (req, res) => {
  try {
    const nuevo = await Evento.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const evento = await Evento.findByPk(req.params.id);
  if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
  await evento.update(req.body);
  res.json(evento);
});

router.delete('/:id', async (req, res) => {
  const evento = await Evento.findByPk(req.params.id);
  if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
  await evento.destroy();
  res.status(204).send();
});

module.exports = router;
