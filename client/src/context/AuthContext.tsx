import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // Restore user session if token exists
  useEffect(() => {
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setUser(data);
          } else {
            logout();
          }
        })
        .catch(() => logout());
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setUser(data.username || { email }); // If backend doesn't send user, fallback
    } else {
      throw new Error(data.error || 'Login failed');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
