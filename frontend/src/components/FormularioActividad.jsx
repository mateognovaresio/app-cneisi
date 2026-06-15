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

  const inputClase =
    'w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-sky-500';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">Crear charla</h3>
      {error && (
        <div className="bg-red-950 border border-red-800 text-red-300 text-sm rounded-lg p-3 mb-4">
          {error}
        </div>
      )}
      <form onSubmit={manejarEnvio} className="space-y-3">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className={inputClase}
        />
        <input
          type="text"
          placeholder="Disertante"
          value={disertante}
          onChange={(e) => setDisertante(e.target.value)}
          className={inputClase}
        />
        <input
          type="datetime-local"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
          className={inputClase}
        />
        <input
          type="number"
          placeholder="Cupo"
          value={cupo}
          onChange={(e) => setCupo(e.target.value)}
          className={inputClase}
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-semibold rounded-lg px-4 py-2 transition-colors"
        >
          Crear charla
        </button>
      </form>
    </div>
  );
}

export default FormularioActividad;
