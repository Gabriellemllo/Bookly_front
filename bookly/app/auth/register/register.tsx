import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/useAuthStore";

export default function RegisterScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const register = useAuthStore((state) => state.register);

  const handleRegister = async () => {
    setErrorMessage("");

    if (!email || !username || !password || !confirm) {
      setErrorMessage("Preencha todos os campos obrigatórios!");
      return;
    }

    if (password !== confirm) {
      setErrorMessage("As senhas não coincidem!");
      return;
    }

    if (!acceptedTerms) {
      setErrorMessage("Você precisa aceitar os Termos de Serviço.");
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: username,
        email: email.trim(),
        password,
        description: description || undefined,
      });

      Alert.alert("Sucesso!", "Conta criada com sucesso!", [
        {
          text: "OK",
          onPress: () => router.replace("/auth/(tabs)/home"),
        },
      ]);
    } catch (error: any) {
      setErrorMessage(error.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      
      <Image 
        source={require("../../../assets/images/logo_bookly.png")} 
        style={styles.logo}
      />

      <Text style={styles.title}>Crie sua conta</Text>

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#7a7f87"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!isLoading}
      />

      <TextInput
        placeholder="Nome de usuário"
        placeholderTextColor="#7a7f87"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="words"
        editable={!isLoading}
      />

      <TextInput
        placeholder="Descrição (opcional)"
        placeholderTextColor="#7a7f87"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={2}
        editable={!isLoading}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#7a7f87"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        editable={!isLoading}
      />

      <TextInput
        placeholder="Confirmar Senha"
        placeholderTextColor="#7a7f87"
        style={styles.input}
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
        autoCapitalize="none"
        editable={!isLoading}
      />

     
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => !isLoading && setAcceptedTerms(!acceptedTerms)}
        disabled={isLoading}
      >
        <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]} />
        <Text style={styles.checkboxText}>Eu aceito os Termos de Serviço</Text>
      </TouchableOpacity>

      {!!errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar-se</Text>
        )}
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1218",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 16,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "#0f1218",
    borderWidth: 1,
    borderColor: "#3a3f4b",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    fontSize: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 5,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#3a3f4b",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#00FF99",
    borderColor: "#00FF99",
  },
  checkboxText: {
    color: "#fff",
    fontSize: 14,
  },

  button: {
    backgroundColor: "#3db0ff",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    width: "100%",
    textAlign: "center",
  },
});

