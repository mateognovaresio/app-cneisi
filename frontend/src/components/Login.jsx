import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function manejarEnvio(e) {
    e.preventDefault();
    setError('');

    const respuesta = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!respuesta.ok) {
      setError('Acceso denegado. Revisá tu email y contraseña.');
      return;
    }

    const usuario = await respuesta.json();
    login(usuario);
    navigate('/cronograma');
  }

  return (
    <form onSubmit={manejarEnvio}>
      <h2>Ingresar</h2>
      <p>Accedé con tu correo de inscripto al congreso.</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <input
          type="email"
          placeholder="tu.email@universidad.edu.ar"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Ingresar</button>
    </form>
  );
}

export default Login;
