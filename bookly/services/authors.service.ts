import api from './api';

export interface Author {
    id: string;
    name: string;
    bio?: string;
    birthDate?: string;
    nationality?: string;
    createdAt?: string;
    updatedAt?: string;
}

class AuthorsService {
  async getAuthors(): Promise<Author[]> {
    try {
      const response = await api.get<Author[]>('/authors');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao buscar autores'
      );
    }
  }

  async getAuthorById(id: string): Promise<Author> {
    try {
      const response = await api.get<Author>(`/authors/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao buscar autor'
      );
    }
  }
}

export default new AuthorsService();
