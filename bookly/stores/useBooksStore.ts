import { create } from 'zustand';
import booksService, { type Book, type BookFilters } from '../services/books.service';

interface BooksState {
  // Estado
  books: Book[];
  isLoading: boolean;
  error: string | null;

  // Ações
  fetchBooks: (filters?: BookFilters) => Promise<void>;
  clearError: () => void;
}

export const useBooksStore = create<BooksState>((set) => ({
  // Estado inicial
  books: [],
  isLoading: false,
  error: null,

  // Busca livros com filtros opcionais
  fetchBooks: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const booksData = await booksService.getBooks(filters);
      set({
        books: booksData,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        books: [],
        error: error.message,
        isLoading: false,
      });
    }
  },

  // Limpa erro
  clearError: () => set({ error: null }),
}));
