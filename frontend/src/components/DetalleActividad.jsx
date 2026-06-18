import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function DetalleActividad() {
  const { id } = useParams();
  const { token } = useAuth();
  const [actividad, setActividad] = useState(null);
  const [inscripto, setInscripto] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/actividades/${id}`)
      .then((r) => r.json())
      .then((datos) => setActividad(datos));

    fetch(`http://localhost:3000/inscripciones/mia/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((datos) => setInscripto(datos.inscripto));
  }, [id, token]);

  async function inscribirme() {
    const r = await fetch('http://localhost:3000/inscripciones/inscribir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ actividadId: Number(id) }),
    });
    const datos = await r.json();
    if (r.ok) {
      setActividad({ ...actividad, cupo: datos.cupoRestante });
      setInscripto(true);
      setMensaje('¡Inscripción confirmada!');
    } else {
      setMensaje(datos.error || 'No se pudo inscribir.');
    }
  }

  async function cancelar() {
    const r = await fetch('http://localhost:3000/inscripciones/cancelar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ actividadId: Number(id) }),
    });
    const datos = await r.json();
    if (r.ok) {
      setActividad({ ...actividad, cupo: datos.cupoRestante });
      setInscripto(false);
      setMensaje('Inscripción cancelada.');
    } else {
      setMensaje(datos.error || 'No se pudo cancelar.');
    }
  }

  if (!actividad) {
    return (
      <div className="min-h-screen bg-slate-950 p-6">
        <p className="text-slate-400 max-w-2xl mx-auto">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-2xl mx-auto">
        <Link to="/cronograma" className="text-sky-400 hover:text-sky-300 text-sm">
          ← Volver al cronograma
        </Link>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-2">{actividad.titulo}</h2>
          {actividad.disertante && (
            <p className="text-sky-400 mb-4">{actividad.disertante}</p>
          )}
          <p className="text-slate-300 text-sm">
            <span className="text-slate-500">Cupo disponible: </span>
            {actividad.cupo}
          </p>

          {mensaje && (
            <div className="mt-4 bg-slate-800 border border-slate-700 text-sky-300 text-sm rounded-lg p-3">
              {mensaje}
            </div>
          )}

          {inscripto ? (
            <button
              onClick={cancelar}
              className="mt-6 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-lg px-5 py-2.5 transition-colors"
            >
              Cancelar inscripción
            </button>
          ) : (
            <button
              onClick={inscribirme}
              className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-semibold rounded-lg px-5 py-2.5 transition-colors"
            >
              Inscribirme
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalleActividad;
