import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null, // Inicializado aquí
      isAuthenticated: false,
      login: (user, token, refreshToken) => set({ 
        user, 
        token,
        refreshToken,
        isAuthenticated: true 
      }),
      logout: () => {
        set({ 
          user: null, 
          token: null,
          refreshToken: null,
          isAuthenticated: false 
        });
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      },
      initialize: () => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken'); // Añadido
        const user = localStorage.getItem('user');
        if (token && user) {
          set({ 
            user: JSON.parse(user), 
            token,
            refreshToken, // Añadido
            isAuthenticated: true 
          });
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);