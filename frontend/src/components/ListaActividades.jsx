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

  if (editando) {
    return (
      <li>
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <input
          type="number"
          value={cupo}
          onChange={(e) => setCupo(e.target.value)}
          style={{ width: 70 }}
        />
        <button onClick={guardar}>Guardar</button>
        <button onClick={() => setEditando(false)}>Cancelar</button>
      </li>
    );
  }

  return (
    <li>
      <strong>{actividad.titulo}</strong>
      {actividad.disertante && <> — {actividad.disertante}</>}
      <small> (cupo: {actividad.cupo})</small>
      <button onClick={() => setEditando(true)} style={{ marginLeft: 8 }}>
        Editar
      </button>
      <button onClick={() => onEliminar(actividad.id)} style={{ marginLeft: 4 }}>
        Eliminar
      </button>
    </li>
  );
}

function ListaActividades({ actividades, onEliminar, onActualizar }) {
  if (actividades.length === 0) {
    return <p>Todavía no hay charlas cargadas.</p>;
  }

  return (
    <ul>
      {actividades.map((act) => (
        <FilaActividad
          key={act.id}
          actividad={act}
          onEliminar={onEliminar}
          onActualizar={onActualizar}
        />
      ))}
    </ul>
  );
}

export default ListaActividades;
