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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <div className="mb-6">
          <span className="font-mono text-sky-400 text-lg">&lt;CNEISI/&gt;</span>
          <span className="font-mono text-yellow-400 text-lg ml-1">2026</span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-1">Ingresar</h2>
        <p className="text-slate-400 text-sm mb-6">
          Accedé con tu correo de inscripto al congreso.
        </p>

        {error && (
          <div className="bg-red-950 border border-red-800 text-red-300 text-sm rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={manejarEnvio} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm mb-1">Email de inscripto</label>
            <input
              type="email"
              placeholder="tu.email@universidad.edu.ar"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-sky-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-semibold rounded-lg py-2.5 transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
