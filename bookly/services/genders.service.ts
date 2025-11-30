import api from './api';

export interface Gender {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

class GendersService {
  async getGenders(): Promise<Gender[]> {
    try {
      const response = await api.get<Gender[]>('/genders');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao buscar gêneros'
      );
    }
  }

  async getGenderById(id: string): Promise<Gender> {
    try {
      const response = await api.get<Gender>(`/genders/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao buscar gênero'
      );
    }
  }
}

export default new GendersService();
