function ListaActividades({ actividades }) {
  if (actividades.length === 0) {
    return <p>Todavía no hay charlas cargadas.</p>;
  }

  return (
    <ul>
      {actividades.map((act) => (
        <li key={act.id}>
          <strong>{act.titulo}</strong>
          {act.disertante && <> — {act.disertante}</>}
          <small> (cupo: {act.cupo})</small>
        </li>
      ))}
    </ul>
  );
}

export default ListaActividades;
