// app/auth/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="Home" options={{ title: 'Home' }} />
      <Tabs.Screen name="Catalog" options={{ title: 'Catálogo' }} />
      <Tabs.Screen name="Assessment" options={{ title: 'Avaliação' }} />
      <Tabs.Screen name="Profile" options={{ title: 'Perfil' }} />
      <Tabs.Screen name="Settings" options={{ title: 'Configurações' }} />
      <Tabs.Screen name="Logoff" options={{ title: 'Sair', tabBarStyle: { backgroundColor: '#F00' } }} />
    </Tabs>
  );
}
