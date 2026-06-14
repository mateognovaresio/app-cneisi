const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Evento } = require('../models');

const reglasEvento = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('fechaInicio').isDate().withMessage('La fecha de inicio no es válida'),
  body('fechaFin').isDate().withMessage('La fecha de fin no es válida'),
];

function validar(req, res, next) {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });
  next();
}

router.get('/', async (req, res) => {
  const eventos = await Evento.findAll();
  res.json(eventos);
});

router.get('/:id', async (req, res) => {
  const evento = await Evento.findByPk(req.params.id);
  if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
  res.json(evento);
});

router.post('/', reglasEvento, validar, async (req, res) => {
  try {
    const nuevo = await Evento.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', reglasEvento, validar, async (req, res) => {
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
