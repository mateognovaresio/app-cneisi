const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({ mensaje: 'App CNEISI backend funcionando' });
});

app.listen(PORT, () => {
  console.log(`Serv http://localhost:${PORT}`);
});