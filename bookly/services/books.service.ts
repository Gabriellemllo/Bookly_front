import api from './api';

export interface Book {
  id: string;
  title: string;
  imgUrl?: string;
  description: string;
  year: number;
  AuthorId: string;
  GenderId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookFilters {
  title?: string;
}

export interface BooksResponse {
  message: string;
  data: Book[];
}

class BooksService {
  async getBooks(filters?: BookFilters): Promise<Book[]> {
    try {
      const params = new URLSearchParams();
      
      if (filters?.title) params.append('title', filters.title);
      
      const url = params.toString() ? `/books?${params.toString()}` : '/books';
      const response = await api.get<BooksResponse>(url);
      
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao buscar livros'
      );
    }
  }

  async getBookById(id: string): Promise<Book> {
    try {
      const response = await api.get<{ message: string; data: Book }>(`/books/${id}`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || error.response?.data?.error || 'Erro ao buscar livro'
      );
    }
  }
}

export default new BooksService();
