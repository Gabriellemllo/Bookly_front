import React, { useState } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { CustomButton } from '@/components/button';
import { TextLink } from '@/components/textlink';
import { TogglePasswordIcon } from '@/components/togglePasswordIcon';
import { useAuthStore } from '@/stores/useAuthStore';
import styles from './styles';

export default function LoginScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);

  const canContinue = email.trim().length > 0 && password.trim().length > 0;

  const handleContinue = async () => {
    if (!canContinue) {
      setErrorMessage('Os campos devem ser preenchidos');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      await login({ email: email.trim(), password });
      router.replace('/auth/(tabs)/home');
    } catch (error: any) {
      setErrorMessage(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={require('../../../assets/images/logo_bookly.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Input
        variant="outline"
        size="md"
        isDisabled={isLoading}
        isInvalid={!!errorMessage}
        isReadOnly={false}
        style={styles.input}
      >
        <InputField
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Input>

      <Input
        variant="outline"
        size="md"
        isDisabled={isLoading}
        isInvalid={!!errorMessage}
        isReadOnly={false}
        style={styles.input}
      >
        <InputField
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          type={showPwd ? 'text' : 'password'}
          autoCapitalize="none"
        />
        <InputSlot>
          <TogglePasswordIcon
            show={showPwd}
            onToggle={() => setShowPwd(v => !v)}
          />
        </InputSlot>
      </Input>

      {!!errorMessage && (
        <Text style={{ color: 'red', marginBottom: 8 }}>{errorMessage}</Text>
      )}

      <CustomButton
        title={isLoading ? '' : 'Continuar'}
        onPress={handleContinue}
        disabled={isLoading || !canContinue}
      >
        {isLoading && <ActivityIndicator color="#fff" />}
      </CustomButton>

      <View style={styles.linksWrapper}>
        <TextLink
          onPress={() => router.push('/auth/register/register')}
          style={styles.link}
        >
          Cadastre-se
        </TextLink>
        <TextLink
          onPress={() => router.push('/auth/register/register')} // quando implementar a funcionalidade de recuperar senha, alterar a rota aqui
          style={[styles.link, styles.forgot]}
        >
          Esqueci a minha senha
        </TextLink>
      </View>
    </View>
  );
}
