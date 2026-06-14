import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const { usuario } = useAuth();

  return (
    <div>
      <h1>App CNEISI</h1>
      {usuario ? <Dashboard /> : <Login />}
    </div>
  );
}

export default App;
