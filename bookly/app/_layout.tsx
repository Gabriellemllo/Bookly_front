import { Stack } from 'expo-router';
import { MD3DarkTheme, PaperProvider, Portal } from 'react-native-paper';
import { CoresEscuras } from '../constants/Colors';

export default function RootLayout() {
  const temaEscuro = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...CoresEscuras,
    },
  };

  return (
    <PaperProvider theme={temaEscuro}>
      <Portal.Host>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login/index" options={{ headerShown: false }} />
          <Stack.Screen name="register/index" options={{ headerShown: false }} />
          <Stack.Screen name="home/index" options={{ headerShown: false }} />
          <Stack.Screen name="reservas/morador" options={{ headerShown: false }} />
          <Stack.Screen name="reservas/sindico" options={{ headerShown: false }} />
          <Stack.Screen name="addAccountability/index" options={{ headerShown: false }} />
          <Stack.Screen name="prestacao-morador/index" options={{ headerShown: false }} />
          <Stack.Screen name="parking/index" options={{ headerShown: false }} />
          <Stack.Screen name="notice/index" options={{ headerShown: false }} />
        </Stack>
      </Portal.Host>
    </PaperProvider>
  );
}
