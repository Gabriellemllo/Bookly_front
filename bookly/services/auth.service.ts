import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  description?: string;
  profilePhotoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  description?: string;
  password: string;
  profilePhotoUrl?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<{ message: string; data: AuthResponse }>('/auth/login', credentials);
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao realizar login'
      );
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<{ message: string; data: AuthResponse }>('/auth/register', data);
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao criar conta'
      );
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao realizar logout'
      );
    }
  }

  async getUserById(userId: string): Promise<User> {
    try {
      const response = await api.get<{ message: string; data: User }>(`/users/${userId}`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao buscar usuário'
      );
    }
  }
}

export default new AuthService();
