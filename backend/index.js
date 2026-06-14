const express = require('express');
const { sequelize } = require('./models');
const usuariosRouter = require('./routes/usuarios');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: '¡App CNEISI backend funcionando!' });
});

app.use('/usuarios', usuariosRouter);

async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log('Conexión con la base de datos establecida.');
    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas.');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

iniciar();
