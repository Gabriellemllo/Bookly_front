import { Stack } from 'expo-router';
import { MD3DarkTheme, PaperProvider, Portal } from 'react-native-paper';
import { CoresEscuras } from '../constants/Colors';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function RootLayout() {
  const temaEscuro = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...CoresEscuras,
    },
  };

  return (
    
    <GluestackUIProvider mode="dark">
      <PaperProvider theme={temaEscuro}>
      <Portal.Host>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login/index" options={{ headerShown: false }} />
          <Stack.Screen name="register/index" options={{ headerShown: false }} />
          <Stack.Screen name="home/index" options={{ headerShown: false }} />
        </Stack>
      </Portal.Host>
    </PaperProvider>
    </GluestackUIProvider>
  );
}
