import { useAuth } from '../context/AuthContext';
import Cronograma from './Cronograma';
import PanelAdmin from './PanelAdmin';

function Dashboard() {
  const { usuario, logout } = useAuth();

  const esGestor = usuario.rol === 'admin' || usuario.rol === 'superadmin';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Hola, {usuario.nombre} ({usuario.rol})</span>
        <button onClick={logout}>Salir</button>
      </div>

      {esGestor ? <PanelAdmin /> : <Cronograma />}
    </div>
  );
}

export default Dashboard;
