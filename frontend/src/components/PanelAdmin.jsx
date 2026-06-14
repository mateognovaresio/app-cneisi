import { useAuth } from '../context/AuthContext';

function PanelAdmin() {
  const { usuario } = useAuth();

  const modulos = [
    { titulo: 'ABM de charlas', desc: 'Alta, baja y modificación de actividades.', roles: ['admin', 'superadmin'] },
    { titulo: 'Control de asistencia', desc: 'Registrar la asistencia en el aula.', roles: ['admin', 'superadmin'] },
    { titulo: 'Gestión de inscriptos', desc: 'Importar y administrar la lista blanca.', roles: ['superadmin'] },
    { titulo: 'Gestión de Admins', desc: 'ABM de perfiles organizadores.', roles: ['superadmin'] },
    { titulo: 'Métricas y export', desc: 'Asistencia y exportación post-evento.', roles: ['superadmin'] },
  ];

  const modulosVisibles = modulos.filter((m) => m.roles.includes(usuario.rol));

  return (
    <div>
      <h2>Panel de gestión</h2>
      <p>Módulos disponibles para tu rol ({usuario.rol}):</p>
      <div>
        {modulosVisibles.map((m) => (
          <div key={m.titulo} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 12, marginBottom: 8 }}>
            <strong>{m.titulo}</strong>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PanelAdmin;
