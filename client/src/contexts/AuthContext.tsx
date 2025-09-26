import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';
import { storage, generateId } from '../utils/helpers';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy users data
const dummyUsers: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    name: 'Demo User',
    phone: '08123456789',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '1',
    email: 'parent@example.com',
    name: 'Ibu Sarah',
    phone: '08123456789',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    email: 'ayah@example.com',
    name: 'Ayah Budi',
    phone: '08123456790',
    createdAt: new Date('2024-01-02')
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on app start
    const storedUser = storage.get('currentUser');
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check dummy users
    const foundUser = dummyUsers.find(u => u.email === email);
    
    if (!foundUser) {
      setLoading(false);
      throw new Error('Email tidak ditemukan');
    }
    
    // In real app, validate password with backend
    if (password !== 'password123') {
      setLoading(false);
      throw new Error('Password salah');
    }
    
    setUser(foundUser);
    storage.set('currentUser', foundUser);
    setLoading(false);
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = dummyUsers.find(u => u.email === email);
    if (existingUser) {
      setLoading(false);
      throw new Error('Email sudah terdaftar');
    }
    
    // Create new user
    const newUser: User = {
      id: generateId(),
      email,
      name,
      createdAt: new Date()
    };
    
    dummyUsers.push(newUser);
    setUser(newUser);
    storage.set('currentUser', newUser);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    storage.remove('currentUser');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};