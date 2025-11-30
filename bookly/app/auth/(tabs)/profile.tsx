import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/stores/useAuthStore';
import favoritesService, { type Favorite } from '@/services/favorites.service';

const DefaultProfileImage = require('../../../assets/images/usuario.jpg');

export default function Profile() {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const user = useAuthStore((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        if (user?.id) {
            loadFavorites();
        }
    }, [user]);

    const loadFavorites = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const favoritesData = await favoritesService.getFavorites(user!.id);
            setFavorites(favoritesData);
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar favoritos');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBookPress = (bookId: string) => {
        router.push({
            pathname: '/auth/catalog',
            params: { bookId }
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={{ flex: 1, backgroundColor: '#181B20' }}>
                <Stack.Screen options={{ 
                    headerShown: false, 
                    title: "profile"
                }} />
                
                <View style={styles.profileSection}>
                    <Image
                        source={user?.profilePhotoUrl ? { uri: user.profilePhotoUrl } : DefaultProfileImage}
                        style={styles.profileImage}
                    />
                    <Text style={styles.name}>{user?.name || 'Usuário'}</Text>
                    <Text style={styles.tagline}>{user?.description || 'Sem descrição'}</Text>
                </View>

                <View style={styles.favoritesTitleContainer}>
                    <Text style={styles.favoritesTitle}>⭐ Favoritos</Text>
                    <TouchableOpacity 
                        onPress={loadFavorites} 
                        disabled={isLoading}
                        style={styles.refreshButton}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#00FF99" />
                        ) : (
                            <Ionicons name="refresh" size={20} color="#00FF99" />
                        )}
                    </TouchableOpacity>
                </View>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#00FF99" />
                    <Text style={styles.loadingText}>Carregando favoritos...</Text>
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : favorites.length > 0 ? (
                <View style={styles.favoritesContainer}>
                    {favorites.map((favorite) => (
                        <TouchableOpacity 
                            key={favorite.id} 
                            style={styles.bookContainer}
                            onPress={() => handleBookPress(favorite.BookId)}
                        >
                            {favorite.Book?.imgUrl ? (
                                <Image 
                                    source={{ uri: favorite.Book.imgUrl }} 
                                    style={styles.bookCover} 
                                />
                            ) : (
                                <View style={[styles.bookCover, styles.bookCoverPlaceholder]}>
                                    <Text style={styles.bookCoverPlaceholderText}>
                                        {favorite.Book?.title.substring(0, 1) || '?'}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Nenhum favorito ainda</Text>
                </View>
            )}

                <View style={{ height: 100 }} /> 
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#181B20'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    iconButton: {
        padding: 10,
    },
    iconText: {
        color: 'white',
        fontSize: 24,
    },
    profileSection: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'white',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 5,
    },
    tagline: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    favoritesTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 10,
    },

    favoritesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },

    refreshButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 255, 153, 0.1)',
    },

   favoritesContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  paddingHorizontal: 15,
  marginBottom: 20,
  gap: 8,
},

bookContainer: {
  width: "31.5%",
  marginBottom: 8,
},

  bookCover: {
  width: "100%",      
  height: 150,
  borderRadius: 10,
  resizeMode: "cover",
},

loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
},

loadingText: {
    color: '#888',
    marginTop: 10,
    fontSize: 14,
},

errorContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
},

errorText: {
    color: '#ff4444',
    fontSize: 14,
    textAlign: 'center',
},

emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
},

emptyText: {
    color: '#888',
    fontSize: 14,
},

bookCoverPlaceholder: {
    backgroundColor: '#2a2d35',
    justifyContent: 'center',
    alignItems: 'center',
},

bookCoverPlaceholderText: {
    color: '#00FF99',
    fontSize: 40,
    fontWeight: 'bold',
},

});
