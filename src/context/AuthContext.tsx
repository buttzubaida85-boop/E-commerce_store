import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Address } from '../types/ecommerce';
import { DEMO_USER, DEMO_ADMIN } from '../data/mockProducts';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, role?: 'user' | 'admin') => boolean;
  register: (name: string, email: string) => boolean;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  toggleAdminMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'novamart_auth_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEMO_USER; // Default to demo user for easy exploration
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth state', e);
    }
  }, [user]);

  const login = (email: string, role: 'user' | 'admin' = 'user') => {
    if (role === 'admin' || email.includes('admin')) {
      setUser(DEMO_ADMIN);
    } else {
      setUser({
        ...DEMO_USER,
        email: email || DEMO_USER.email
      });
    }
    return true;
  };

  const register = (name: string, email: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'user',
      addresses: []
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleAdminMode = () => {
    if (user?.role === 'admin') {
      setUser(DEMO_USER);
    } else {
      setUser(DEMO_ADMIN);
    }
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updatedData });
  };

  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    if (!user) return;
    const address: Address = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      isDefault: user.addresses.length === 0 ? true : newAddr.isDefault
    };

    let updated = [...user.addresses];
    if (address.isDefault) {
      updated = updated.map(a => ({ ...a, isDefault: false }));
    }
    updated.push(address);

    setUser({ ...user, addresses: updated });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      addresses: user.addresses.filter(a => a.id !== id)
    });
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      addresses: user.addresses.map(a => ({
        ...a,
        isDefault: a.id === id
      }))
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        toggleAdminMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
