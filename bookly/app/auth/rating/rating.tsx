import {Text, View, Image, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView} from "react-native";
import {TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import { KeyboardAvoidingView, Keyboard } from "react-native";
import {Platform} from 'react-native';
import { useState } from 'react';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from "expo-router";
import reviewsService from "../../../services/reviews.service";
import { CoresEscuras } from "@/constants/Colors";

export default function Rating(){
  const [rating, setRating] = useState(4);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { bookId, bookImage, bookTitle } = useLocalSearchParams<{
    bookId: string;
    bookImage: string;
    bookTitle: string;
  }>();

  const stars = [1,2,3,4,5];

  function pressStar(value){
    setRating(value);
  }

  async function submitRating(){
    if (!text.trim()) {
      Alert.alert('Atenção', 'Por favor, escreva um comentário sobre o livro.');
      return;
    }

    if (!bookId) {
      Alert.alert('Erro', 'ID do livro não encontrado.');
      return;
    }

    try {
      setIsSubmitting(true);
      await reviewsService.createReview(bookId, {
        rate: rating,
        comment: text.trim()
      });

      Alert.alert(
        'Sucesso', 
        'Sua avaliação foi enviada com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao enviar avaliação');
    } finally {
      setIsSubmitting(false);
    }
  }

  return(
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={26} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Avalie o livro</Text>

            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          
          <View style={styles.content}>

          <View style={styles.starsRow}>
            {stars.map((s) => {
              const filled = s <= rating;
              return (
                <TouchableOpacity
                  key={s}
                  activeOpacity={0.8}
                  onPress={() => pressStar(s)}
                  style={styles.starTouch}
                >
                  <Text style={[styles.star, filled ? styles.starFilled : styles.starEmpty]}>
                    ★
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Image 
            source={{ uri: bookImage || 'https://via.placeholder.com/140x200' }} 
            style={styles.cover} 
            resizeMode="contain" 
          />

          <Text style={styles.label}>Descreva sua experiência:</Text>

          <TextInput
            style={styles.input}
            multiline
            placeholder="Escreva uma mensagem"
            placeholderTextColor="#999"
            value={text}
            onChangeText={setText}
            textAlignVertical="top"
            maxLength={1000}
          />

          <TouchableOpacity 
            style={[styles.button, isSubmitting && styles.buttonDisabled]} 
            activeOpacity={0.85} 
            onPress={submitRating}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Enviar experiência</Text>
            )}
          </TouchableOpacity>

        </View>

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CoresEscuras.background,
  },

  scrollContent: {
    flexGrow: 1,
  },

  
  header: {
    marginTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  
  content: {
    alignItems: 'center',
    marginTop: 10,
  },

  starsRow: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 18,
    justifyContent: 'center',
  },
  starTouch: {
    marginHorizontal: 6,
  },
  star: {
    fontSize: 36,
  },
  starFilled: {
    color: '#00E08A',
  },
  starEmpty: {
    color: '#2A2F31',
  },

  cover: {
    width: 140,
    height: 200,
    marginBottom: 20,
    borderRadius: 6,
    backgroundColor: '#111213',
  },

  label: {
    width: '85%',
    color: '#E9E9FA',
    fontWeight: '500',
    marginBottom: 8,
  },

  input: {
    width: '85%',
    minHeight: 140,
    backgroundColor: '#0f1218',
    borderWidth: 1,
    borderColor: "#3a3f4b",
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
  },

  button: {
    width: '70%',
    paddingVertical: 14,
    borderRadius: 28,
    backgroundColor: '#3db0ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
