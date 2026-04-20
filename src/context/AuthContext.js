import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveUser, getUser, clearUser } from '../services/storageService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto login khi mở app
  useEffect(() => {
    checkAutoLogin();
  }, []);

  const checkAutoLogin = async () => {
    const saved = await getUser();
    if (saved) setUser(saved);
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      // Giả lập xác thực - chấp nhận bất kỳ email/password không rỗng
      if (!email || !password) {
        throw new Error('Vui lòng nhập email và mật khẩu');
      }
      const userData = {
        id: '1',
        name: 'Afsar Hossen',
        email: email,
        token: 'token_' + Date.now(),
      };
      await saveUser(userData);
      setUser(userData);
      return userData;
    } catch (e) {
      console.error('Login error:', e);
      throw e;
    }
  };

  const logout = async () => {
    await clearUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
