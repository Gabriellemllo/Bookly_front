import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function BookDetailScreen() {

  const [favorito, setFavorito] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.titleHeader}>Catalogo</Text>

        <TouchableOpacity onPress={() => setFavorito(!favorito)}>
          <Ionicons
            name={favorito ? "heart" : "heart-outline"}
            size={28}
            color={favorito ? "#4cd964" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      {/* Capa */}
      <View style={styles.coverContainer}>
        <Image
          source={require('../../../assets/images/capa-livroece.png')}
          style={styles.cover}
        />
      </View>

      {/* Info Livro */}
      <Text style={styles.bookTitle}>Esta Chovendo Estrela</Text>
      <Text style={styles.meta}>2021  •  Ana Santos  •  Viseu</Text>
      <Text style={styles.meta}>Português  •  12+</Text>

      {/* Sinopse */}
      <Text style={styles.description}>
        Ariel é uma paciente terminal. Porém ela parou com todo tipo de tratamento por 
        não responder mais aos medicamentos e os tratamentos para o câncer já terem 
        poupado das cinco vidas. Mas como todos os outros chamam, as vidas. A 6° vida 
        ela chama Joey. Depois da 6° vida colocou a marca e sua vida mudou drasticamente 
        quando Billie entrou para seu mundo de fã. Seu fã número 1.
        {"\n\n"}
        Tudo o que estavam temido aconteceu, se apaixonou por um garoto em forma de 
        clichê. Juntos, os dois vão perceber que percorreram caminhos estrelados nas 
        páginas em branco de suas vidas.
      </Text>

      {/* Ranking */}
      <Text style={styles.sectionTitle}>RANKING</Text>

      <View style={styles.starsRow}>
        <Ionicons name="star" size={32} color="#4cd964" />
        <Ionicons name="star" size={32} color="#4cd964" />
        <Ionicons name="star" size={32} color="#4cd964" />
        <Ionicons name="star" size={32} color="#4cd964" />
        <Ionicons name="star-outline" size={32} color="#4cd964" />
      </View>

      <Text style={styles.rating}>Avaliação: <Text style={{ fontWeight: "bold" }}>4,0</Text></Text>

      {/* Botões */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Comentar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Avaliações</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 50,
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
  }
});
