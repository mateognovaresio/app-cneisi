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

  async function eliminarActividad(id) {
    const respuesta = await fetch(`http://localhost:3000/actividades/${id}`, {
      method: 'DELETE',
    });
    if (respuesta.ok) {
      setActividades(actividades.filter((act) => act.id !== id));
    }
  }

  function actualizarActividad(actualizada) {
    setActividades(
      actividades.map((act) => (act.id === actualizada.id ? actualizada : act))
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-1">Panel de gestión</h2>
        <p className="text-slate-400 text-sm mb-6">
          Sesión: {usuario.nombre} ({usuario.rol})
        </p>

        <FormularioActividad onActividadCreada={agregarActividad} />

        <h3 className="text-lg font-semibold text-white mt-8 mb-3">
          Charlas cargadas
        </h3>
        {cargando ? (
          <p className="text-slate-400">Cargando charlas...</p>
        ) : (
          <ListaActividades
            actividades={actividades}
            onEliminar={eliminarActividad}
            onActualizar={actualizarActividad}
          />
        )}
      </div>
    </div>
  );
}

export default PanelAdmin;
