import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const esGestor = usuario.rol === 'admin' || usuario.rol === 'superadmin';

  function manejarLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 12, borderBottom: '1px solid #ccc' }}>
      <strong>App CNEISI</strong>
      <Link to="/cronograma">Cronograma</Link>
      {esGestor && <Link to="/panel">Panel</Link>}
      <span style={{ marginLeft: 'auto' }}>
        {usuario.nombre} ({usuario.rol})
      </span>
      <button onClick={manejarLogout}>Salir</button>
    </nav>
  );
}

export default Navbar;
