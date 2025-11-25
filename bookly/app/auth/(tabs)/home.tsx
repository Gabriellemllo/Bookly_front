import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import { TextInput, Avatar, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

const FILTERS = ['Todos', 'Romance', 'Terror', 'Aventura', 'Ficção'];

// Estrutura de dados dos livros com suas categorias
const BOOKS = [
  { 
    id: 1, 
    title: 'Crepúsculo 1', 
    image: require('../../../assets/images/capa_livrocrepusculo.jpg'),
    genre: 'Romance'
  },
  { 
    id: 2, 
    title: 'O Grande Gatsby 1', 
    image: require('../../../assets/images/capa_livrogatsby.jpg'),
    genre: 'Ficção'
  },
  { 
    id: 3, 
    title: 'Harry Potter 1', 
    image: require('../../../assets/images/capa_livrohp.jpg'),
    genre: 'Aventura'
  },
  { 
    id: 4, 
    title: 'Crepúsculo 2', 
    image: require('../../../assets/images/capa_livrocrepusculo.jpg'),
    genre: 'Romance'
  },
  { 
    id: 5, 
    title: 'O Grande Gatsby 2', 
    image: require('../../../assets/images/capa_livrogatsby.jpg'),
    genre: 'Ficção'
  },
  { 
    id: 6, 
    title: 'Harry Potter 2', 
    image: require('../../../assets/images/capa_livrohp.jpg'),
    genre: 'Aventura'
  },
  { 
    id: 7, 
    title: 'Crepúsculo 3', 
    image: require('../../../assets/images/capa_livrocrepusculo.jpg'),
    genre: 'Romance'
  },
  { 
    id: 8, 
    title: 'O Grande Gatsby 3', 
    image: require('../../../assets/images/capa_livrogatsby.jpg'),
    genre: 'Terror'
  },
  { 
    id: 9, 
    title: 'Harry Potter 3', 
    image: require('../../../assets/images/capa_livrohp.jpg'),
    genre: 'Aventura'
  },
  { 
    id: 10, 
    title: 'Crepúsculo 4', 
    image: require('../../../assets/images/capa_livrocrepusculo.jpg'),
    genre: 'Romance'
  },
  { 
    id: 11, 
    title: 'O Grande Gatsby 4', 
    image: require('../../../assets/images/capa_livrogatsby.jpg'),
    genre: 'Ficção'
  },
  { 
    id: 12, 
    title: 'Harry Potter 4', 
    image: require('../../../assets/images/capa_livrohp.jpg'),
    genre: 'Aventura'
  },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const router = useRouter();

  const handleBookPress = (bookId: number) => {
    router.push('/auth/catalog');
  };

  // Função para filtrar os livros baseado no gênero e busca
  const getFilteredBooks = () => {
    let filtered = BOOKS;

    // Filtro por gênero
    if (activeFilter !== 'Todos') {
      filtered = filtered.filter(book => book.genre === activeFilter);
    }

    // Filtro por busca
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredBooks = getFilteredBooks();

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
        />
        <Avatar.Image size={40} source={{ uri: 'https://i.pravatar.cc/150?img=3' }} />
      </View>

      {/* Chips - Filtros */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
        style={styles.filtersScroll}
      >
        {FILTERS.map((filter, index) => {
          const isActive = activeFilter === filter;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterChip,
                isActive && styles.filterChipActive
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                isActive && styles.filterTextActive
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Cards - Livros Filtrados */}
      <ScrollView style={styles.cards} showsVerticalScrollIndicator={false}>
        {filteredBooks.length > 0 ? (
          <View style={styles.grid}>
            {filteredBooks.map((book) => (
              <TouchableOpacity 
                key={book.id} 
                style={styles.bookContainer}
                onPress={() => handleBookPress(book.id)}
              >
                <Image source={book.image} style={styles.bookCover} />
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
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 8,
    marginBottom: 80,
  },
  bookContainer: {
    width: '30%',
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
});
