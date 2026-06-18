import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Cronograma() {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    setCargando(true);
    const url = busqueda
      ? `http://localhost:3000/actividades?titulo=${busqueda}`
      : 'http://localhost:3000/actividades';

    fetch(url)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setActividades(datos.actividades);
        setCargando(false);
      });
  }, [busqueda]);

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-1">
          Cronograma de actividades
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Charlas del Congreso Nacional de Estudiantes de ISI.
        </p>

        <input
          type="text"
          placeholder="Buscar charla por título..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 mb-5 focus:outline-none focus:border-sky-500"
        />

        {cargando ? (
          <p className="text-slate-400">Cargando cronograma...</p>
        ) : actividades.length === 0 ? (
          <p className="text-slate-400">No se encontraron actividades.</p>
        ) : (
          <div className="space-y-3">
            {actividades.map((act) => (
              <Link
                key={act.id}
                to={`/actividad/${act.id}`}
                className="block bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-sky-700 transition-colors"
              >
                <h3 className="text-white font-semibold">{act.titulo}</h3>
                {act.disertante && (
                  <p className="text-sky-400 text-sm mt-0.5">{act.disertante}</p>
                )}
                <p className="text-slate-500 text-xs mt-2">
                  Cupo disponible: {act.cupo}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cronograma;
