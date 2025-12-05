import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import booksService, { type Book } from "@/services/books.service";
import favoritesService, { type Favorite } from "@/services/favorites.service";
import { CoresEscuras } from "@/constants/Colors";
import styles from './styles';

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
      if (bookData.avgRating) {
        setAverageRating(parseFloat(bookData.avgRating));
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar detalhes do livro');
    } finally {
      setIsLoading(false);
    }
  };

  const getStarsCount = (rating: number): number => {
    const decimal = rating % 1;
    const fullStars = Math.floor(rating);
    
    if (decimal >= 0.5) {
      return Math.ceil(rating);
    }
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
        await favoritesService.removeFavorite(favoriteData.id);
        setFavorito(false);
        setFavoriteData(null);
        Alert.alert('Sucesso', 'Livro removido dos favoritos');
      } else {

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

          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.meta}>
            {book.year}  •  {book.Author?.name || 'Autor desconhecido'}  •  {book.Gender?.name || 'Gênero não especificado'}
          </Text>

          <Text style={styles.description}>
            {book.description || 'Sem descrição disponível.'}
          </Text>

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