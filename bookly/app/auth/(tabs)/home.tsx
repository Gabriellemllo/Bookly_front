import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import { TextInput, Avatar, useTheme } from 'react-native-paper';

const FILTERS = ['Romance', 'Terror', 'Aventura', 'Ficção', 'Comédia'];
const Book1 = require('../../../assets/images/capa_livrocrepusculo.jpg');
const Book2 = require('../../../assets/images/capa_livrogatsby.jpg');
const Book3 = require('../../../assets/images/capa_livrohp.jpg');

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      {/* Header */}
      <View style={styles.header}>
        <Avatar.Image size={44} source={require('../../../assets/images/logo_bookly.png')} 
          style={{ backgroundColor: 'transparent' }}
        />
        <TextInput
          placeholder="Pesquisar Livro"
          mode="outlined"
          style={styles.search}
          left={<TextInput.Icon icon="magnify" />}
          theme={{ colors: { background: theme.colors.surface } }}
        />
        <Avatar.Image size={44} source={{ uri: 'https://i.pravatar.cc/150?img=3' }} />
      </View>

      {/* Chips - Compactos */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
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

      {/* Cards */}
      <ScrollView style={styles.cards}>
        <View style={styles.grid}>
          <Image source={Book1} style={styles.bookCover} />
          <Image source={Book2} style={styles.bookCover} />
          <Image source={Book3} style={styles.bookCover} />
          <Image source={Book1} style={styles.bookCover} />
          <Image source={Book2} style={styles.bookCover} />
          <Image source={Book3} style={styles.bookCover} />
          <Image source={Book1} style={styles.bookCover} />
          <Image source={Book2} style={styles.bookCover} />
          <Image source={Book3} style={styles.bookCover} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingBottom: 0 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  search: { flex: 1, marginHorizontal: 16, backgroundColor: '#ffffffff' },
  filtersContainer: {
    paddingHorizontal: 0,
    paddingBottom: 12,
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
  cards: { flex: 1 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 8,
    marginBottom: 80,
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#222',
  },
  bookCover: {
    width: '30%',
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
  },
});
