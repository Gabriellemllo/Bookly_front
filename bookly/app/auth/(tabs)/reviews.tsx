import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import reviewsService, { Review } from '../../../services/reviews.service';
import authService, { User } from '../../../services/auth.service';
import booksService, { Book } from '../../../services/books.service';

interface ReviewWithDetails extends Review {
    user?: User;
    book?: Book;
}

export default function Rating() {
    const [activeFilter, setActiveFilter] = useState('Todos');
    const [reviews, setReviews] = useState<ReviewWithDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [uniqueGenres, setUniqueGenres] = useState<string[]>([]);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async (isRefreshing = false) => {
        try {
            if (isRefreshing) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }
            const reviewsData = await reviewsService.getAllReviews();

            // Buscar detalhes de usuários e livros para cada review
            const reviewsWithDetails = await Promise.all(
                reviewsData.map(async (review) => {
                    try {
                        const [user, book] = await Promise.all([
                            authService.getUserById(review.UserId),
                            booksService.getBookById(review.BookId)
                        ]);
                        return { ...review, user, book };
                    } catch (error) {
                        console.error('Erro ao buscar detalhes da review:', error);
                        return { ...review, user: undefined, book: undefined };
                    }
                })
            );

            setReviews(reviewsWithDetails);

            // Extrair gêneros únicos dos livros
            const genres = new Set<string>();
            reviewsWithDetails.forEach(review => {
                if (review.book?.GenderId) {
                    genres.add(review.book.GenderId);
                }
            });
            setUniqueGenres(Array.from(genres));
        } catch (error: any) {
            Alert.alert('Erro', error.message || 'Erro ao carregar avaliações');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        loadReviews(true);
    };

    const getTimeAgo = (dateString: string): string => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return 'agora';
        if (diffMins < 60) return `${diffMins} min atrás`;
        
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h atrás`;
        
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays}d atrás`;
        
        const diffWeeks = Math.floor(diffDays / 7);
        if (diffWeeks < 4) return `${diffWeeks}sem atrás`;
        
        const diffMonths = Math.floor(diffDays / 30);
        return `${diffMonths}m atrás`;
    };

    const filteredReviews = reviews.filter(item => {
        if (activeFilter === 'Todos') return true;
        if (activeFilter === '5 Estrelas') return item.rate === 5;
        // Para filtrar por gênero, precisaríamos ter o nome do gênero
        // Por enquanto, mantém todos se não for "5 Estrelas"
        return true;
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

    const renderItem = ({ item }: { item: ReviewWithDetails }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Image 
                    source={{ uri: item.user?.profilePhotoUrl || 'https://i.pravatar.cc/150?img=11' }} 
                    style={styles.avatar} 
                />
                <View style={styles.headerTextContainer}>
                    <View style={styles.rowTitle}>
                        <Text style={styles.userName}>{item.user?.name || 'Usuário'}</Text>
                        <Text style={styles.timeAgo}>• {getTimeAgo(item.createdAt)}</Text>
                    </View>
                    <Text style={styles.bookAction}>
                        avaliou <Text style={styles.bookTitle}>{item.book?.title || 'Livro'}</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.bookInfoSide}>
                    <Image 
                        source={{ uri: item.book?.imgUrl || 'https://via.placeholder.com/50x75' }} 
                        style={styles.miniBookCover} 
                    />
                </View>

                <View style={styles.reviewTextSide}>
                    {renderStars(item.rate)}
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
                <TouchableOpacity 
                    onPress={handleRefresh}
                    disabled={refreshing}
                    style={styles.refreshButton}
                >
                    {refreshing ? (
                        <ActivityIndicator size="small" color="#00FF99" />
                    ) : (
                        <Ionicons name="refresh" size={24} color="#00FF99" />
                    )}
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#00FF99" />
                    <Text style={styles.loadingText}>Carregando avaliações...</Text>
                </View>
            ) : (
                <>
                    <View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.filtersContainer}
                        >
                            {['Todos', '5 Estrelas'].map((filter, index) => {
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
                </>
            )}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    refreshButton: {
        padding: 8,
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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    loadingText: {
        color: '#AAA',
        marginTop: 10,
        fontSize: 14,
    }
});