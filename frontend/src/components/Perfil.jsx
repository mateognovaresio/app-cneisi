import { useAuth } from '../context/AuthContext';

function Perfil() {
  const { usuario } = useAuth();

  const iniciales = usuario.nombre
    .split(' ')
    .map((palabra) => palabra[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Mi credencial</h2>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="bg-slate-800 px-6 py-4 flex items-center justify-center">
            <img src="/logo.png" alt="CNEISI 2026" className="h-8" />
          </div>

          <div className="p-6 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-sky-500 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-white">{iniciales}</span>
            </div>

            <h3 className="text-xl font-bold text-white">{usuario.nombre}</h3>
            <p className="text-slate-400 text-sm mb-3">{usuario.email}</p>

            <span className="text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 px-3 py-1 rounded-full uppercase tracking-wide">
              {usuario.rol}
            </span>
          </div>

          <div className="border-t border-slate-800 px-6 py-4 text-center">
            <p className="text-slate-500 text-xs">
              Credencial de acreditación · Congreso Nacional de Estudiantes de ISI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
