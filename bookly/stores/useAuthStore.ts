import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService, { type User, type LoginCredentials, type RegisterData } from '../services/auth.service';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: (skipApiCall?: boolean) => Promise<void>;
  clearError: () => void;
  setUser: (user: User) => void;
  hydrate: () => Promise<void>;
}

// AuthStore para gerenciar dados locais de autenticação
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao fazer login',
            isLoading: false,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(data);
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao fazer registro',
            isLoading: false,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      logout: async (skipApiCall = false) => {
        set({ isLoading: true });
        try {
          // Tenta fazer logout na API (se falhar, continua)
          // skipApiCall é true quando a sessão já expirou (401)
          if (!skipApiCall) {
            await authService.logout();
          }
        } catch (error) {
          console.error('Erro ao fazer logout na API:', error);
        } finally {
          // Sempre limpa dados locais
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      // Limpar erro
      clearError: () => set({ error: null }),

      // Atualiza usuário
      setUser: (user) => set({ user }),

      // Restaura estado ao iniciar app
      hydrate: async () => {
        const state = get();
        
        // Se tiver token e user salvos, considera autenticado
        if (state.token && state.user) {
          set({ isAuthenticated: true });
        } else {
          set({ isAuthenticated: false });
        }
      },
    }),
    {
      name: 'bookly-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Persiste user, token e isAuthenticated
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
