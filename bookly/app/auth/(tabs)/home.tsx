import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { TextInput, Avatar, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useBooksStore } from '@/stores/useBooksStore';
import { useAuthStore } from '@/stores/useAuthStore';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const router = useRouter();
  
  const { books = [], isLoading, error, fetchBooks } = useBooksStore();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // Carregar livros ao montar o componente
    fetchBooks();
  }, []);

  useEffect(() => {
    // Buscar livros quando o usuário digitar (debounce manual)
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchBooks({ title: searchQuery.trim() });
      } else {
        fetchBooks();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleBookPress = (bookId: string) => {
    router.push({
      pathname: '/auth/catalog',
      params: { bookId }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      {/* Header */}
      <View style={styles.header}>
        <Avatar.Image 
          size={48} 
          source={require('../../../assets/images/logo_bookly.png')} 
          style={{ backgroundColor: 'transparent' }}
        />
        <TextInput
          placeholder="Pesquisar Livro"
          mode="outlined"
          style={styles.search}
          left={<TextInput.Icon icon="magnify" />}
          value={searchQuery}
          onChangeText={setSearchQuery}
          theme={{ colors: { background: theme.colors.surface } }}
          editable={!isLoading}
        />
        <Avatar.Image 
          size={40} 
          source={{ uri: user?.profilePhotoUrl || 'https://i.pinimg.com/originals/b9/04/8b/b9048b353f53a19766f634eb71967765.jpg' }} 
        />
      </View>

      {/* Cards - Livros */}
      <ScrollView style={styles.cards} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00FF99" />
            <Text style={styles.loadingText}>Carregando livros...</Text>
          </View>
        ) : error ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : books.length > 0 ? (
          <View style={styles.grid}>
            {books.map((book) => (
              <TouchableOpacity 
                key={book.id} 
                style={styles.bookContainer}
                onPress={() => handleBookPress(book.id)}
              >
                {book.imgUrl ? (
                  <Image 
                    source={{ uri: book.imgUrl }} 
                    style={styles.bookCover}
                    defaultSource={require('../../../assets/images/logo_bookly.png')}
                  />
                ) : (
                  <View style={[styles.bookCover, styles.bookCoverPlaceholder]}>
                    <Text style={styles.bookCoverPlaceholderText}>{book.title.substring(0, 1)}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum livro encontrado</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 14, 
    paddingBottom: 9,
    paddingTop: 40, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  search: { 
    flex: 1,
    borderRadius: 24, 
    marginHorizontal: 18, 
    backgroundColor: '#ffffffff' 
  },
  filtersScroll: {
    flexGrow: 0,
    marginBottom: 6,
  },
  filtersContainer: {
    paddingHorizontal: 4,
    paddingBottom: 0,
    paddingTop: 2,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#555',
    marginRight: 8,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterChipActive: {
    backgroundColor: '#00FF99',
    borderColor: '#00FF99',
  },
  filterText: {
    color: '#DDD',
    fontWeight: '500',
    fontSize: 13,
  },
  filterTextActive: {
    color: '#181B20',
    fontWeight: 'bold',
  },
  cards: { 
    flex: 1,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    marginBottom: 80,
  },
  bookContainer: {
    width: '31.5%',
  },
  bookCover: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#969696ff',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  loadingText: {
    color: '#969696ff',
    fontSize: 14,
    marginTop: 12,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
  },
  bookCoverPlaceholder: {
    backgroundColor: '#2a2d35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookCoverPlaceholderText: {
    color: '#00FF99',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
