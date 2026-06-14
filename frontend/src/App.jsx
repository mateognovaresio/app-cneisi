import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Cronograma from './components/Cronograma';
import PanelAdmin from './components/PanelAdmin';
import Navbar from './components/Navbar';

function App() {
  const { usuario } = useAuth();

  return (
    <div>
      {usuario && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cronograma" element={<Cronograma />} />
        <Route path="/panel" element={<PanelAdmin />} />
        <Route path="/" element={<Navigate to={usuario ? '/cronograma' : '/login'} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
