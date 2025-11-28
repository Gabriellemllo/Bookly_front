import api from './api';
import { Book } from './books.service';

export interface Favorite {
  id: string;
  user_id: string;
  book_id: string;
  book?: Book;
  created_at: string;
}

class FavoritesService {
  async getFavorites(): Promise<Favorite[]> {
    try {
      const response = await api.get<Favorite[]>('/favorites');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao buscar favoritos'
      );
    }
  }

  async addFavorite(bookId: string): Promise<Favorite> {
    try {
      const response = await api.post<Favorite>('/favorites', { book_id: bookId });
      return response.data;
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

  async isFavorite(bookId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some(fav => fav.book_id === bookId);
    } catch (error) {
      return false;
    }
  }
}

export default new FavoritesService();
