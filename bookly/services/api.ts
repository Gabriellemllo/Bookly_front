import axios from 'axios';

// URL da API em produção
const API_URL = 'https://bookly-api-eight.vercel.app';

// Cria instância do axios (cliente HTTP) com configurações base
const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  async (config) => {
    try {
      // Importação dinâmica para evitar circular dependency
      const { useAuthStore } = await import('../stores/useAuthStore');
      const token = useAuthStore.getState().token;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Debug em desenvolvimento
      if (__DEV__) {
        console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
      }
    } catch (error) {
      console.error('Erro ao buscar token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros globais
api.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(`📥 ${response.status} ${response.config.url}`);
    }
    return response;
  },
  async (error) => {
    if (__DEV__) {
      console.error(`❌ ${error.config?.url}:`, error.response?.data || error.message);
    }
    
    if (error.response?.status === 401) {
      // Token inválido/expirado - fazer logout automático
      try {
        const { useAuthStore } = await import('../stores/useAuthStore');
        await useAuthStore.getState().logout();
      } catch (err) {
        console.error('Erro ao fazer logout:', err);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
