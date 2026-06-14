import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { usuario, logout } = useAuth();

  return (
    <div>
      <button onClick={logout}>Salir</button>
      <h1>Hola, {usuario.nombre} 👋</h1>
      <p>
        Ingresaste correctamente. Tu rol en el sistema es{' '}
        <strong>{usuario.rol}</strong>.
      </p>

      {usuario.rol === 'superadmin' && (
        <p>Tenés acceso total: gestión de inscriptos, charlas y métricas.</p>
      )}
      {usuario.rol === 'admin' && (
        <p>Como admin podés controlar la asistencia en las aulas.</p>
      )}
      {usuario.rol === 'participante' && (
        <p>Podés ver el cronograma e inscribirte a las charlas.</p>
      )}
    </div>
  );
}

export default Dashboard;
