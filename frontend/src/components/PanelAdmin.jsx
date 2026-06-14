import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import FormularioActividad from './FormularioActividad';
import ListaActividades from './ListaActividades';

function PanelAdmin() {
  const { usuario } = useAuth();
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

  function agregarActividad(nueva) {
    setActividades([...actividades, nueva]);
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Panel de gestión</h2>
      <p>Sesión: {usuario.nombre} ({usuario.rol})</p>

      <FormularioActividad onActividadCreada={agregarActividad} />

      <h3>Charlas cargadas</h3>
      {cargando ? (
        <p>Cargando charlas...</p>
      ) : (
        <ListaActividades actividades={actividades} />
      )}
    </div>
  );
}

export default PanelAdmin;
