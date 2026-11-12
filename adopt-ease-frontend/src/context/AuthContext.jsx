import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { get, post } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    get('/auth/me')
      .then((result) => {
        if (active) setUser(result.user || null);
      })
      .catch((error) => {
        // A 401 simply means the visitor is not signed in yet.
        if (error.status !== 401) console.error('Could not load session:', error);
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function login(credentials) {
    const result = await post('/auth/login', credentials);
    setUser(result.user);
    return result;
  }

  async function register(details) {
    const result = await post('/auth/register', details);
    setUser(result.user);
    return result;
  }

  async function logout() {
    await post('/auth/logout', {});
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, loading, login, register, logout, setUser }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
