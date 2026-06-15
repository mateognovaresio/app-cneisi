import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const esGestor = usuario.rol === 'admin' || usuario.rol === 'superadmin';

  function manejarLogout() {
    logout();
    navigate('/login');
  }

  function claseLink(ruta) {
    const base = 'text-sm transition-colors';
    return location.pathname === ruta
      ? `${base} text-yellow-400`
      : `${base} text-slate-300 hover:text-white`;
  }

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center gap-6">
      <span className="font-mono text-sky-400">&lt;CNEISI/&gt;</span>

      <Link to="/cronograma" className={claseLink('/cronograma')}>
        Cronograma
      </Link>
      {esGestor && (
        <Link to="/panel" className={claseLink('/panel')}>
          Panel
        </Link>
      )}

      <div className="ml-auto flex items-center gap-4">
        <span className="text-sm text-slate-400">
          {usuario.nombre}{' '}
          <span className="text-xs bg-slate-800 text-sky-400 px-2 py-0.5 rounded-full ml-1">
            {usuario.rol}
          </span>
        </span>
        <button
          onClick={manejarLogout}
          className="text-sm bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          Salir
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
