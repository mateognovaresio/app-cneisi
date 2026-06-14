const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');

router.get('/', async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

router.get('/:id', async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuario);
});

router.post('/', async (req, res) => {
  try {
    const nuevo = await Usuario.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  await usuario.update(req.body);
  res.json(usuario);
});

router.delete('/:id', async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  await usuario.destroy();
  res.status(204).send();
});

module.exports = router;
