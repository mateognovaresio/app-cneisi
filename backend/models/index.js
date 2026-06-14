const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Evento = require('./Evento');
const Actividad = require('./Actividad');
const Inscripcion = require('./Inscripcion');
const Asistencia = require('./Asistencia');

Evento.hasMany(Actividad, { foreignKey: 'eventoId' });
Actividad.belongsTo(Evento, { foreignKey: 'eventoId' });

Usuario.hasMany(Inscripcion, { foreignKey: 'usuarioId' });
Inscripcion.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Actividad.hasMany(Inscripcion, { foreignKey: 'actividadId' });
Inscripcion.belongsTo(Actividad, { foreignKey: 'actividadId' });

Inscripcion.hasOne(Asistencia, { foreignKey: 'inscripcionId' });
Asistencia.belongsTo(Inscripcion, { foreignKey: 'inscripcionId' });

module.exports = { sequelize, Usuario, Evento, Actividad, Inscripcion, Asistencia };
