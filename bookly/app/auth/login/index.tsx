import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { CustomButton } from '@/components/button';
import { TextLink } from '@/components/textlink';
import { TogglePasswordIcon } from '@/components/togglePasswordIcon';
import styles from './styles';

export default function LoginScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const canContinue = user.trim().length > 0 && password.trim().length > 0;

  const handleContinue = () => {
    if (canContinue) {
      setErrorMessage('');
      router.push('/auth/(tabs)/home');
    } else {
      setErrorMessage('Os campos devem ser preenchidos');
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
        isDisabled={false}
        isInvalid={!!errorMessage}
        isReadOnly={false}
        style={styles.input}
      >
        <InputField
          placeholder="Usuario"
          value={user}
          onChangeText={setUser}
        />
      </Input>

      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={!!errorMessage}
        isReadOnly={false}
        style={styles.input}
      >
        <InputField
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          type={showPwd ? 'text' : 'password'}
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
        title="Continuar"
        onPress={handleContinue}
      />

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
