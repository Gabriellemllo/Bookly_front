import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";

export default function VerificationScreen() {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text.slice(-1);
    setCode(newCode);
  };

  const handleConfirm = () => {
    const finalCode = code.join("");

    if (finalCode === "0000") {
      Alert.alert("Código correto!", "Redirecionando...");

    router.push("/auth/(tabs)/home");


      return;
    }

    Alert.alert("Código incorreto", "O código correto para teste é 0000.");
  };

  return (
    <View style={styles.container}>
      
      <Image 
        source={require("../../../assets/images/logo_bookly.png")} 
        style={styles.logo}
      />

      <Text style={styles.text}>
        Digite o código que enviamos para o seu e-mail :
      </Text>

      <Image 
        source={require("../../../assets/images/envelope.png")}
        style={styles.mailIcon}
      />

      
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            style={styles.codeBox}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

     
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirmar</Text>
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
    paddingHorizontal: 30,
    gap: 20,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginBottom: 20,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
  mailIcon: {
    width: 75,
    height: 75,
    resizeMode: "contain",
    marginBottom: 10,
  },
  codeContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  codeBox: {
    width: 50,
    height: 50,
    backgroundColor: "#0f1218",
    borderWidth: 1,
    borderColor: "#3a3f4b",
    borderRadius: 8,
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#3db0ff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
