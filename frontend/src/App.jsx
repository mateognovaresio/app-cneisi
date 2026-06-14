import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [usuario, setUsuario] = useState(null);

  function manejarLogin(usuarioLogueado) {
    setUsuario(usuarioLogueado);
  }

  function cerrarSesion() {
    setUsuario(null);
  }

  return (
    <div>
      <h1>App CNEISI</h1>
      {usuario ? (
        <Dashboard usuario={usuario} onCerrarSesion={cerrarSesion} />
      ) : (
        <Login onLoginExitoso={manejarLogin} />
      )}
    </div>
  );
}

export default App;
