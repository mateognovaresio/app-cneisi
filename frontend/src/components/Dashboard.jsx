function Dashboard({ usuario, onCerrarSesion }) {
  return (
    <div>
      <button onClick={onCerrarSesion}>Salir</button>
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
