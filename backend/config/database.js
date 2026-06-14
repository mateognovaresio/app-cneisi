const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './cneisi.sqlite',
  logging: false,
});

module.exports = sequelize;
