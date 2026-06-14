import { useState, useEffect } from 'react';

function App() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/eventos')
      .then((respuesta) => respuesta.json())
      .then((datos) => setEventos(datos));
  }, []);

  return (
    <div>
      <h1>App CNEISI</h1>
      <h2>Eventos</h2>
      <ul>
        {eventos.map((evento) => (
          <li key={evento.id}>
            {evento.nombre} — {evento.lugar}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
