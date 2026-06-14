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

  if (cargando) {
    return <p>Cargando cronograma...</p>;
  }

  return (
    <div>
      <h2>Cronograma de actividades</h2>
      {actividades.length === 0 ? (
        <p>Todavía no hay actividades cargadas.</p>
      ) : (
        <ul>
          {actividades.map((act) => (
            <li key={act.id}>
              <strong>{act.titulo}</strong>
              {act.disertante && <> — {act.disertante}</>}
              <br />
              <small>Cupo: {act.cupo}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cronograma;
