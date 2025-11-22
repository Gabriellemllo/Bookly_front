import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [birth, setBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleRegister = () => {
    if (!email || !username || !birth || !password || !confirm) {
      alert("Preencha todos os campos!");
      return;
    }

    if (password !== confirm) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!acceptedTerms) {
      alert("Você precisa aceitar os Termos de Serviço.");
      return;
    }

    router.push({
      pathname: "/auth/verification/verification",
      params: { email, code: "0000" },
    });
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
      />

      <View style={styles.row}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#7a7f87"
          style={[styles.input, styles.halfInput]}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Nascimento"
          placeholderTextColor="#7a7f87"
          style={[styles.input, styles.halfInput]}
          value={birth}
          onChangeText={setBirth}
        />
      </View>

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#7a7f87"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirmar Senha"
        placeholderTextColor="#7a7f87"
        style={styles.input}
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

     
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setAcceptedTerms(!acceptedTerms)}
      >
        <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]} />
        <Text style={styles.checkboxText}>Eu aceito os Termos de Serviço</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar-se</Text>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  halfInput: {
    width: "48%",
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
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});

