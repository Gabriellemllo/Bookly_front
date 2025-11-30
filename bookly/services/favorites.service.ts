import api from './api';
import { Book } from './books.service';

export interface Favorite {
  id: string;
  UserId: string;
  BookId: string;
  Book?: Book;
  createdAt: string;
  updatedAt: string;
}

class FavoritesService {
  /**
   * Busca favoritos do usuário
   * Se userId for fornecido: GET /favorites/user/:userId
   * Senão: GET /favorites (usuário do token)
   */
  async getFavorites(userId?: string): Promise<Favorite[]> {
    try {
      const url = userId ? `/favorites/user/${userId}` : '/favorites';
      const response = await api.get<{ message: string; data: Favorite[] }>(url);
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao buscar favoritos'
      );
    }
  }

  async addFavorite(bookId: string): Promise<Favorite> {
    try {
      const response = await api.post<{ message: string; data: Favorite }>(`/favorites?bookId=${bookId}`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao adicionar favorito'
      );
    }
  }

  async removeFavorite(favoriteId: string): Promise<void> {
    try {
      await api.delete(`/favorites/${favoriteId}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao remover favorito'
      );
    }
  }

  /**
   * Verifica se um livro específico está nos favoritos do usuário logado
   * GET /favorites/user/verify?bookId=xxx (userId vem do token)
   */
  async checkFavoriteStatus(bookId: string): Promise<{ isFavorite: boolean; favorite: Favorite | null }> {
    try {
      const response = await api.get<{ message: string; data: Favorite | null }>(`/favorites/user/verify?bookId=${bookId}`);
      const favorite = response.data.data;
      return {
        isFavorite: favorite !== null,
        favorite: favorite
      };
    } catch (error: any) {
      // Se retornar 404 ou erro, significa que não está favoritado
      if (error.response?.status === 404) {
        return { isFavorite: false, favorite: null };
      }
      console.error('Erro ao verificar status de favorito:', error);
      return { isFavorite: false, favorite: null };
    }
  }

  async getFavoriteByBookId(bookId: string, userId?: string): Promise<Favorite | null> {
    try {
      const { favorite } = await this.checkFavoriteStatus(bookId);
      return favorite;
    } catch (error) {
      return null;
    }
  }

  async isFavorite(bookId: string): Promise<boolean> {
    try {
      const { isFavorite } = await this.checkFavoriteStatus(bookId);
      return isFavorite;
    } catch (error) {
      return false;
    }
  }
}

export default new FavoritesService();
