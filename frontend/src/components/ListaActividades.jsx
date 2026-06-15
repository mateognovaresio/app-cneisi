import { useState } from 'react';

function FilaActividad({ actividad, onEliminar, onActualizar }) {
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(actividad.titulo);
  const [cupo, setCupo] = useState(actividad.cupo);

  async function guardar() {
    const respuesta = await fetch(`http://localhost:3000/actividades/${actividad.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo,
        disertante: actividad.disertante,
        inicio: actividad.inicio,
        cupo: Number(cupo),
        eventoId: actividad.eventoId,
      }),
    });
    if (respuesta.ok) {
      const actualizada = await respuesta.json();
      onActualizar(actualizada);
      setEditando(false);
    }
  }

  const inputClase =
    'bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-sky-500';

  if (editando) {
    return (
      <div className="bg-slate-900 border border-sky-800 rounded-xl p-4 flex flex-wrap items-center gap-2">
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className={`${inputClase} flex-1`} />
        <input
          type="number"
          value={cupo}
          onChange={(e) => setCupo(e.target.value)}
          className={`${inputClase} w-20`}
        />
        <button onClick={guardar} className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 text-sm font-semibold rounded-lg px-3 py-1.5">
          Guardar
        </button>
        <button onClick={() => setEditando(false)} className="bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg px-3 py-1.5">
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
      <div className="flex-1">
        <h4 className="text-white font-medium">{actividad.titulo}</h4>
        {actividad.disertante && (
          <p className="text-sky-400 text-sm">{actividad.disertante}</p>
        )}
        <p className="text-slate-500 text-xs mt-1">Cupo: {actividad.cupo}</p>
      </div>
      <button
        onClick={() => setEditando(true)}
        className="text-sm text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg px-3 py-1.5 transition-colors"
      >
        Editar
      </button>
      <button
        onClick={() => onEliminar(actividad.id)}
        className="text-sm text-red-300 hover:text-white bg-red-950 hover:bg-red-900 rounded-lg px-3 py-1.5 transition-colors"
      >
        Eliminar
      </button>
    </div>
  );
}

function ListaActividades({ actividades, onEliminar, onActualizar }) {
  if (actividades.length === 0) {
    return <p className="text-slate-400">Todavía no hay charlas cargadas.</p>;
  }

  return (
    <div className="space-y-3">
      {actividades.map((act) => (
        <FilaActividad
          key={act.id}
          actividad={act}
          onEliminar={onEliminar}
          onActualizar={onActualizar}
        />
      ))}
    </div>
  );
}

export default ListaActividades;
