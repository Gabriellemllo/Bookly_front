import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

// dados mockados para vizualização
const REVIEWS = [
    {
        id: '1',
        userName: 'Carlos Silva',
        userAvatar: 'https://i.pravatar.cc/150?img=11',
        bookTitle: 'O Grande Gatsby',
        bookCover: 'https://i.imgur.com/2nCt3Sbl.jpg',
        rating: 5,
        comment: 'Uma obra prima! A forma como o autor descreve a alta sociedade é fascinante.',
        timeAgo: '2 min atrás',
        genre: 'Ficção'
    },
    {
        id: '2',
        userName: 'Julia Mendes',
        userAvatar: 'https://i.pravatar.cc/150?img=5',
        bookTitle: 'Crepúsculo',
        bookCover: 'https://i.imgur.com/0y8Ftya.jpg',
        rating: 3,
        comment: 'Bom para passar o tempo, mas o romance é um pouco exagerado para o meu gosto atual.',
        timeAgo: '15 min atrás',
        genre: 'Romance'
    },
    {
        id: '3',
        userName: 'Roberto Jr.',
        userAvatar: 'https://i.pravatar.cc/150?img=60',
        bookTitle: 'Harry Potter',
        bookCover: 'https://i.imgur.com/1bX5QH6.jpg',
        rating: 5,
        comment: 'Relendo pela décima vez. Nunca perde a magia!',
        timeAgo: '1h atrás',
        genre: 'Aventura'
    },
    {
        id: '4',
        userName: 'Amanda Lee',
        userAvatar: 'https://i.pravatar.cc/150?img=9',
        bookTitle: 'It: A Coisa',
        bookCover: 'https://i.imgur.com/3M7wh1F.jpg',
        rating: 4,
        comment: 'Aterrorizante do início ao fim. O desenvolvimento dos personagens é incrível.',
        timeAgo: '3h atrás',
        genre: 'Terror'
    },
    {
        id: '5',
        userName: 'Lucas Pereira',
        userAvatar: 'https://i.pravatar.cc/150?img=12',
        bookTitle: 'Orgulho e Preconceito',
        bookCover: 'https://i.imgur.com/0y8Ftya.jpg',
        rating: 5,
        comment: 'O melhor romance de época já escrito. Mr. Darcy é icônico.',
        timeAgo: '5h atrás',
        genre: 'Romance'
    },
];

const FILTERS = ['Todos', '5 Estrelas', 'Romance', 'Terror', 'Aventura', 'Ficção'];

export default function Rating() {
    const [activeFilter, setActiveFilter] = useState('Todos');

    const filteredReviews = REVIEWS.filter(item => {
        if (activeFilter === 'Todos') return true;
        if (activeFilter === '5 Estrelas') return item.rating === 5;
        return item.genre === activeFilter;
    });

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Ionicons
                    key={i}
                    name={i <= rating ? "star" : "star-outline"}
                    size={16}
                    color="#00FF99"
                    style={{ marginRight: 2 }}
                />
            );
        }
        return <View style={styles.starsContainer}>{stars}</View>;
    };

    const renderItem = ({ item }: { item: typeof REVIEWS[0] }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
                <View style={styles.headerTextContainer}>
                    <View style={styles.rowTitle}>
                        <Text style={styles.userName}>{item.userName}</Text>
                        <Text style={styles.timeAgo}>• {item.timeAgo}</Text>
                    </View>
                    <Text style={styles.bookAction}>
                        avaliou <Text style={styles.bookTitle}>{item.bookTitle}</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.bookInfoSide}>
                    <Image source={{ uri: item.bookCover }} style={styles.miniBookCover} />
                    <View style={styles.miniGenreBadge}>
                        <Text style={styles.miniGenreText}>{item.genre}</Text>
                    </View>
                </View>

                <View style={styles.reviewTextSide}>
                    {renderStars(item.rating)}
                    <Text style={styles.comment}>{item.comment}</Text>
                </View>
            </View>

            <View style={styles.cardFooter}>
                <TouchableOpacity style={styles.footerAction}>
                    <Ionicons name="heart-outline" size={20} color="#888" />
                    <Text style={styles.footerText}>Curtir</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerAction}>
                    <Ionicons name="chatbubble-outline" size={18} color="#888" />
                    <Text style={styles.footerText}>Responder</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.headerContainer}>
                <Text style={styles.screenTitle}>Feed de Avaliações</Text>
            </View>

            <View>
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
            </View>

            <FlatList
                data={filteredReviews}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="book-outline" size={48} color="#555" />
                        <Text style={styles.emptyText}>Nenhuma avaliação encontrada.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181B20',
        paddingTop: 50,
    },
    headerContainer: {
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    filtersContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        gap: 8,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#555',
        marginRight: 8,
    },
    filterChipActive: {
        backgroundColor: '#00FF99',
        borderColor: '#00FF99',
    },
    filterText: {
        color: '#DDD',
        fontWeight: '500',
        fontSize: 14,
    },
    filterTextActive: {
        color: '#181B20',
        fontWeight: 'bold',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 80,
    },
    card: {
        backgroundColor: '#22252A',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#333',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    headerTextContainer: {
        flex: 1,
    },
    rowTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userName: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    timeAgo: {
        color: '#888',
        fontSize: 12,
    },
    bookAction: {
        color: '#AAA',
        fontSize: 14,
    },
    bookTitle: {
        color: '#00FF99',
        fontWeight: '600',
    },
    contentContainer: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    bookInfoSide: {
        marginRight: 12,
        alignItems: 'center',
    },
    miniBookCover: {
        width: 50,
        height: 75,
        borderRadius: 4,
        backgroundColor: '#333',
    },
    miniGenreBadge: {
        marginTop: 4,
        backgroundColor: '#333',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    miniGenreText: {
        color: '#AAA',
        fontSize: 8,
        fontWeight: 'bold',
    },
    reviewTextSide: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    starsContainer: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    comment: {
        color: '#DDD',
        fontSize: 14,
        lineHeight: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingTop: 12,
        gap: 20,
    },
    footerAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    footerText: {
        color: '#888',
        fontSize: 12,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    emptyText: {
        color: '#888',
        marginTop: 10,
        fontSize: 14,
    }
});