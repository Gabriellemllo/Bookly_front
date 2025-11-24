import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router'; 

const ProfileImage = require('../../../assets/images/usuario.jpg');
const Book1 = require('../../../assets/images/capa_livrocrepusculo.jpg');
const Book2 = require('../../../assets/images/capa_livrogatsby.jpg');
const Book3 = require('../../../assets/images/capa_livrohp.jpg');

export default function Profile() {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#181B20' }}>
            <Stack.Screen options={{ 
                headerShown: false, 
                title: "profile"
            }} />

            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton}>
                    <Text style={styles.iconText}>{"<"}</Text> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Text style={styles.iconText}>...</Text> 
                </TouchableOpacity>
            </View>

            <View style={styles.profileSection}>
                <Image
                    source={ProfileImage} 
                    style={styles.profileImage}
                />
                <Text style={styles.name}>Roberta Braga</Text>
                <Text style={styles.tagline}>Apaixonada por romances!</Text>
            </View>

            <Text style={styles.favoritesTitle}>⭐ Favoritos</Text>

          
          <View style={styles.favoritesContainer}>
  <Image source={Book1} style={styles.bookCover} />
  <Image source={Book2} style={styles.bookCover} />
  <Image source={Book3} style={styles.bookCover} />
  <Image source={Book1} style={styles.bookCover} />
  <Image source={Book2} style={styles.bookCover} />
  <Image source={Book3} style={styles.bookCover} />
</View>

            <View style={{ height: 100 }} /> 
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 40,
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
    favoritesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 15,
        marginBottom: 10,
    },

   favoritesContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  paddingHorizontal: 15,
  marginBottom: 20,
},

  bookCover: {
  width: "30%",      
  height: 150,
  borderRadius: 10,
  marginBottom: 15,
  resizeMode: "cover",
},

});
