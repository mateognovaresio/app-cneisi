import { useState, useEffect } from 'react';

function Cronograma() {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/actividades')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setActividades(datos);
        setCargando(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-1">
          Cronograma de actividades
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Charlas del Congreso Nacional de Estudiantes de ISI.
        </p>

        {cargando ? (
          <p className="text-slate-400">Cargando cronograma...</p>
        ) : actividades.length === 0 ? (
          <p className="text-slate-400">Todavía no hay actividades cargadas.</p>
        ) : (
          <div className="space-y-3">
            {actividades.map((act) => (
              <div
                key={act.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors"
              >
                <h3 className="text-white font-semibold">{act.titulo}</h3>
                {act.disertante && (
                  <p className="text-sky-400 text-sm mt-0.5">{act.disertante}</p>
                )}
                <p className="text-slate-500 text-xs mt-2">
                  Cupo disponible: {act.cupo}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cronograma;
