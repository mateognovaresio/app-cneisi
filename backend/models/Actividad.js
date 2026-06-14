const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Actividad = sequelize.define('Actividad', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  disertante: { type: DataTypes.STRING, allowNull: true },
  inicio: { type: DataTypes.DATE, allowNull: false },
  cupo: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

module.exports = Actividad;
