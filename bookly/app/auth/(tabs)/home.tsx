import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Chip, Card, TextInput, Avatar, useTheme, Text } from 'react-native-paper';


const genres = ['Romance', 'Terror', 'Ficção', 'Aventura', 'Mistério'];
const books = [
  { title: 'Estrelas', img: 'https://i.imgur.com/0y8Ftya.jpg' },
  { title: 'Harry Potter', img: 'https://i.imgur.com/1bX5QH6.jpg' },
  { title: 'Cocina', img: 'https://i.imgur.com/2nCt3Sbl.jpg' },
  { title: 'Estrelas', img: 'https://i.imgur.com/0y8Ftya.jpg' },
  { title: 'Harry Potter', img: 'https://i.imgur.com/1bX5QH6.jpg' },
  { title: 'Cocina', img: 'https://i.imgur.com/2nCt3Sbl.jpg' },
  { title: 'See You Later', img: 'https://i.imgur.com/3M7wh1F.jpg' },
  { title: 'Cocina', img: 'https://i.imgur.com/2nCt3Sbl.jpg' },
  { title: 'Estrelas', img: 'https://i.imgur.com/0y8Ftya.jpg' },
];

export default function Home() {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 30) / 3; // 16 padding + 8*2 gap

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      {/* Header */}
      <View style={styles.header}>
        <Avatar.Image size={48} source={{ uri: 'https://i.pravatar.cc/100' }} />
        <TextInput
          placeholder="Pesquisar Livro"
          mode="outlined"
          style={styles.search}
          left={<TextInput.Icon icon="magnify" />}
          theme={{ colors: { background: theme.colors.surface } }}
        />
        <Avatar.Image size={40} source={{ uri: 'https://i.pravatar.cc/150?img=3' }} />
      </View>

      {/* Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
        {genres.map((genre, index) => (
          <Chip
            key={index}
            style={styles.chip}
            textStyle={{ color: theme.colors.onSurface }}
            mode="outlined"
          >
            {genre}
          </Chip>
        ))}
      </ScrollView>

      {/* Cards */}
      <ScrollView style={styles.cards}>
        <View style={styles.grid}>
          {books.map((book, i) => (
            <Card key={i} style={[styles.card, { width: cardWidth }]} mode="elevated">
              <Card.Cover source={{ uri: book.img }} style={{ height: 140 }} />
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingBottom: 0 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  search: { flex: 1, marginHorizontal: 12, backgroundColor: 'transparent' },
  chips: { marginTop: 8, marginBottom: 8 },
  chip: { marginRight: 8, borderRadius: 12, borderWidth: 1 },
  cards: { flex: 1 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 8,
    marginBottom: 80, // espaço para o BottomNav
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#222',
  },
});
