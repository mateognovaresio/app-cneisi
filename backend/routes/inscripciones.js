const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Inscripcion, Actividad } = require('../models');
const { verificarToken } = require('../middleware/auth');

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

router.get('/mia/:actividadId', verificarToken, async (req, res) => {
  const inscripcion = await Inscripcion.findOne({
    where: {
      usuarioId: req.usuario.id,
      actividadId: req.params.actividadId,
    },
  });
  res.json({ inscripto: !!inscripcion, inscripcion });
});

router.get('/:id', async (req, res) => {
  const inscripcion = await Inscripcion.findByPk(req.params.id);
  if (!inscripcion) return res.status(404).json({ error: 'Inscripción no encontrada' });
  res.json(inscripcion);
});

router.post('/inscribir', verificarToken, async (req, res) => {
  const usuarioId = req.usuario.id;
  const { actividadId } = req.body;

  const actividad = await Actividad.findByPk(actividadId);
  if (!actividad) {
    return res.status(404).json({ error: 'La actividad no existe' });
  }

  const yaInscripto = await Inscripcion.findOne({ where: { usuarioId, actividadId } });
  if (yaInscripto) {
    return res.status(400).json({ error: 'Ya estás inscripto a esta actividad' });
  }

  const inscripcion = await Inscripcion.create({ usuarioId, actividadId });

  actividad.cupo = actividad.cupo - 1;
  await actividad.save();

  res.status(201).json({ inscripcion, cupoRestante: actividad.cupo });
});

router.post('/cancelar', verificarToken, async (req, res) => {
  const usuarioId = req.usuario.id;
  const { actividadId } = req.body;

  const inscripcion = await Inscripcion.findOne({ where: { usuarioId, actividadId } });
  if (!inscripcion) {
    return res.status(404).json({ error: 'No estás inscripto a esta actividad' });
  }

  await inscripcion.destroy();

  const actividad = await Actividad.findByPk(actividadId);
  if (actividad) {
    actividad.cupo = actividad.cupo + 1;
    await actividad.save();
  }

  res.json({ cupoRestante: actividad ? actividad.cupo : null });
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
