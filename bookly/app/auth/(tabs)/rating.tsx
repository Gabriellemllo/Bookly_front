import {Text, View, Image, TextInput, StyleSheet} from "react-native";
import {TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import { KeyboardAvoidingView, Keyboard } from "react-native";
import {Platform} from 'react-native';
import { useState } from 'react';
import { Ionicons, Entypo } from '@expo/vector-icons';

// imagem gerada pelo back
const Image_Back = '';

export default function Rating({ navigation }){
  const [rating, setRating] = useState(4);
  const [text, setText] = useState('');

  const stars = [1,2,3,4,5];

  function pressStar(value){
    setRating(value);
  }

  function submitRating(){
    console.log ({rating, text});
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
            source={{ uri: Image_Back }} 
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

          <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={submitRating}>
            <Text style={styles.buttonText}>Enviar experiência</Text>
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A202C',
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
    backgroundColor: '#E9E9FA',
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
    backgroundColor: '#23A2CC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
