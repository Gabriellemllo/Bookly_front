import api from './api';
import { Book } from './books.service';

export interface ReviewUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  description?: string;
  profilePhotoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  UserId: string;
  BookId: string;
  rate: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  User?: ReviewUser;
  Book?: Book;
}

export interface CreateReviewData {
  rate: number;
  comment: string;
}

class ReviewsService {
  async getAllReviews(): Promise<Review[]> {
    try {
      const response = await api.get<{ message: string; data: Review[] }>('/reviews');
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao buscar avaliações'
      );
    }
  }

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

  async createReview(bookId: string, data: CreateReviewData): Promise<Review> {
    try {
      const response = await api.post<{ message: string; data: Review }>(`/reviews?bookId=${bookId}`, data);
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao criar avaliação'
      );
    }
  }

  async getBookAverageRating(bookId: string): Promise<number> {
    try {
      const response = await api.get<{ message: string; data: { avg: string } }>(`/reviews/average/book/${bookId}`);
      const avgString = response.data.data.avg;
      return parseFloat(avgString) || 0;
    } catch (error: any) {
      return 0;
    }
  }
}

export default new ReviewsService();
