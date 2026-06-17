import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('usuario');
    return guardado ? JSON.parse(guardado) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  function login(datosUsuario, tokenRecibido) {
    setUsuario(datosUsuario);
    setToken(tokenRecibido);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
    localStorage.setItem('token', tokenRecibido);
  }

  function logout() {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
