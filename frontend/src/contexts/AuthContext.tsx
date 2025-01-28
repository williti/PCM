import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      // TODO: Implementar chamada real à API
      const mockUser = {
        id: '1',
        name: 'Usuário Teste',
        email: email,
        role: 'admin',
        avatar: 'https://via.placeholder.com/150',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setError(null);
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    setError(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
