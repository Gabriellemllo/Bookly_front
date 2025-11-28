import api from './api';

export interface Review {
  id: string;
  user_id: string;
  book_id: string;
  rating: number;
  comment?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CreateReviewData {
  book_id: string;
  rating: number;
  comment?: string;
}

export interface UpdateReviewData {
  rating?: number;
  comment?: string;
}

class ReviewsService {
  async getBookReviews(bookId: string): Promise<Review[]> {
    try {
      const response = await api.get<Review[]>(`/reviews/book/${bookId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao buscar avaliações'
      );
    }
  }

  async getUserReviews(): Promise<Review[]> {
    try {
      const response = await api.get<Review[]>('/reviews/user');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao buscar suas avaliações'
      );
    }
  }

  async createReview(data: CreateReviewData): Promise<Review> {
    try {
      const response = await api.post<Review>('/reviews', data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao criar avaliação'
      );
    }
  }
}

export default new ReviewsService();
