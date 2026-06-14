import { useState } from 'react';

function FormularioActividad({ onActividadCreada }) {
  const [titulo, setTitulo] = useState('');
  const [disertante, setDisertante] = useState('');
  const [inicio, setInicio] = useState('');
  const [cupo, setCupo] = useState('');
  const [error, setError] = useState('');

  async function manejarEnvio(e) {
    e.preventDefault();
    setError('');

    const respuesta = await fetch('http://localhost:3000/actividades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo,
        disertante,
        inicio,
        cupo: Number(cupo),
        eventoId: 1,
      }),
    });

    if (!respuesta.ok) {
      setError('No se pudo crear la charla. Revisá los datos.');
      return;
    }

    const nueva = await respuesta.json();
    onActividadCreada(nueva);

    setTitulo('');
    setDisertante('');
    setInicio('');
    setCupo('');
  }

  return (
    <form onSubmit={manejarEnvio} style={{ marginBottom: 20 }}>
      <h3>Crear charla</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Disertante"
          value={disertante}
          onChange={(e) => setDisertante(e.target.value)}
        />
      </div>
      <div>
        <input
          type="datetime-local"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Cupo"
          value={cupo}
          onChange={(e) => setCupo(e.target.value)}
        />
      </div>
      <button type="submit">Crear charla</button>
    </form>
  );
}

export default FormularioActividad;
