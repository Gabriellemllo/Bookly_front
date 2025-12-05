import axios from 'axios';

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

// Flag para evitar múltiplos alertas de sessão expirada
let isShowingSessionExpiredAlert = false;

// Interceptor para tratamento de erros globais
api.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(`📥 ${response.status} ${response.config.url}`);
    }
    return response;
  },
  async (error) => {
    // Não loga erros 404 pois são esperados (ex: favorito não encontrado)
    if (__DEV__ && error.response?.status !== 404) {
      console.error(`❌ ${error.config?.url}:`, error.response?.data || error.message);
    }
    
    if (error.response?.status === 401 && !isShowingSessionExpiredAlert) {
      // Token inválido/expirado - fazer logout automático
      isShowingSessionExpiredAlert = true;
      
      try {
        const { Alert } = await import('react-native');
        const { router } = await import('expo-router');
        const { useAuthStore } = await import('../stores/useAuthStore');
        
        // Faz logout (skipApiCall=true pois a sessão já expirou)
        await useAuthStore.getState().logout(true);
        
        // Exibe alert
        Alert.alert(
          'Sessão Expirada',
          'Sua sessão expirou. Por favor, faça login novamente.',
          [
            {
              text: 'OK',
              onPress: () => {
                isShowingSessionExpiredAlert = false;
                // Redireciona para login
                router.replace('/auth/login');
              }
            }
          ],
          { cancelable: false }
        );
      } catch (err) {
        console.error('Erro ao tratar expiração de sessão:', err);
        isShowingSessionExpiredAlert = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
