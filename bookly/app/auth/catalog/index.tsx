import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import booksService, { type Book } from "@/services/books.service";
import favoritesService, { type Favorite } from "@/services/favorites.service";
import reviewsService from "@/services/reviews.service";
import { CoresEscuras } from "@/constants/Colors";

export default function BookDetailScreen() {
  const [favorito, setFavorito] = useState(false);
  const [favoriteData, setFavoriteData] = useState<Favorite | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { bookId } = useLocalSearchParams<{ bookId: string }>();

  useEffect(() => {
    if (bookId) {
      loadBookDetails();
      checkFavoriteStatus();
    }
  }, [bookId]);

  const loadBookDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const bookData = await booksService.getBookById(bookId!);
      setBook(bookData);
      // Atualiza o rating a partir dos dados do livro
      if (bookData.avgRating) {
        setAverageRating(parseFloat(bookData.avgRating));
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar detalhes do livro');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para calcular quantas estrelas preencher
  const getStarsCount = (rating: number): number => {
    const decimal = rating % 1;
    const fullStars = Math.floor(rating);
    
    // Se a parte decimal for >= 0.5, arredonda para cima
    if (decimal >= 0.5) {
      return Math.ceil(rating);
    }
    // Senão, arredonda para baixo
    return fullStars;
  };

  const checkFavoriteStatus = async () => {
    try {
      const { isFavorite, favorite } = await favoritesService.checkFavoriteStatus(bookId!);
      setFavorito(isFavorite);
      setFavoriteData(favorite);
    } catch (err) {
      console.error('Erro ao verificar favorito:', err);
      setFavorito(false);
      setFavoriteData(null);
    }
  };

  const handleToggleFavorite = async () => {
    if (isFavoriteLoading) return;

    setIsFavoriteLoading(true);
    try {
      if (favorito && favoriteData) {
        // Remover dos favoritos
        await favoritesService.removeFavorite(favoriteData.id);
        setFavorito(false);
        setFavoriteData(null);
        Alert.alert('Sucesso', 'Livro removido dos favoritos');
      } else {
        // Adicionar aos favoritos
        const newFavorite = await favoritesService.addFavorite(bookId!);
        setFavorito(true);
        setFavoriteData(newFavorite);
        Alert.alert('Sucesso', 'Livro adicionado aos favoritos');
      }
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Erro ao atualizar favoritos');
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={CoresEscuras.background} />
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.titleHeader}>Catálogo</Text>

        <TouchableOpacity onPress={handleToggleFavorite} disabled={isFavoriteLoading}>
          {isFavoriteLoading ? (
            <ActivityIndicator size="small" color="#4cd964" />
          ) : (
            <Ionicons
              name={favorito ? "heart" : "heart-outline"}
              size={28}
              color={favorito ? "#4cd964" : "#fff"}
            />
          )}
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4cd964" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.button} onPress={loadBookDetails}>
            <Text style={styles.buttonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : book ? (
        <>
          {/* Capa */}
          <View style={styles.coverContainer}>
            {book.imgUrl ? (
              <Image
                source={{ uri: book.imgUrl }}
                style={styles.cover}
              />
            ) : (
              <View style={[styles.cover, styles.coverPlaceholder]}>
                <Text style={styles.coverPlaceholderText}>{book?.title?.substring(0, 1) || '?'}</Text>
              </View>
            )}
          </View>

          {/* Info Livro */}
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.meta}>
            {book.year}  •  {book.Author?.name || 'Autor desconhecido'}  •  {book.Gender?.name || 'Gênero não especificado'}
          </Text>

          {/* Sinopse */}
          <Text style={styles.description}>
            {book.description || 'Sem descrição disponível.'}
          </Text>

          {/* Ranking */}
          <Text style={styles.sectionTitle}>RANKING</Text>

          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= getStarsCount(averageRating) ? "star" : "star-outline"}
                size={32}
                color="#4cd964"
              />
            ))}
          </View>

          <Text style={styles.rating}>
            Avaliação: <Text style={{ fontWeight: "bold" }}>{averageRating.toFixed(1)}</Text>
          </Text>
        </>
      ) : null}

      {/* Botões - só aparece quando o livro estiver carregado */}
      {!isLoading && book && (
        <View style={styles.buttonsRow}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push({
              pathname: '/auth/rating/rating',
              params: { 
                bookId: bookId,
                bookImage: book.imgUrl || '',
                bookTitle: book.title || ''
              }
            })}
          >
            <Text style={styles.buttonText}>Avaliar</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CoresEscuras.background
  },

  container: {
    flex: 1,
    backgroundColor: CoresEscuras.background
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: CoresEscuras.background,
  },

  titleHeader: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600"
  },

  coverContainer: {
    alignItems: "center",
    marginTop: 20
  },

  cover: {
    width: 200,
    height: 300,
    borderRadius: 12
  },

  bookTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20
  },

  meta: {
    color: "#bdbdbd",
    textAlign: "center",
    marginTop: 3
  },

  description: {
    color: "#ddd",
    padding: 20,
    lineHeight: 20,
    textAlign: "justify"
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 10
  },

  starsRow: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10
  },

  rating: {
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
    fontSize: 16
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20
  },

  button: {
    backgroundColor: "#1e1e1e",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#444"
  },

  buttonText: {
    color: "#fff",
    fontSize: 16
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100
  },

  loadingText: {
    color: "#bdbdbd",
    marginTop: 12,
    fontSize: 14
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    paddingHorizontal: 20
  },

  errorText: {
    color: "#ff4444",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20
  },

  coverPlaceholder: {
    backgroundColor: "#2a2d35",
    justifyContent: "center",
    alignItems: "center"
  },

  coverPlaceholderText: {
    color: "#4cd964",
    fontSize: 80,
    fontWeight: "bold"
  }
});
