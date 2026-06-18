import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Cronograma from './components/Cronograma';
import DetalleActividad from './components/DetalleActividad';
import PanelAdmin from './components/PanelAdmin';
import Perfil from './components/Perfil';
import Navbar from './components/Navbar';
import RutaProtegida from './components/RutaProtegida';

function App() {
  const { usuario } = useAuth();

  return (
    <div>
      {usuario && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/cronograma"
          element={
            <RutaProtegida>
              <Cronograma />
            </RutaProtegida>
          }
        />

        <Route
          path="/actividad/:id"
          element={
            <RutaProtegida>
              <DetalleActividad />
            </RutaProtegida>
          }
        />

        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <Perfil />
            </RutaProtegida>
          }
        />

        <Route
          path="/panel"
          element={
            <RutaProtegida rolesPermitidos={['admin', 'superadmin']}>
              <PanelAdmin />
            </RutaProtegida>
          }
        />

        <Route path="/" element={<Navigate to={usuario ? '/cronograma' : '/login'} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
