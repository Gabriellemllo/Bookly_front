import { useTheme } from 'react-native-paper';
import { Text, View } from 'react-native';

export default function SplashTela() {
  const { colors } = useTheme();
  return(
    <View style={{ flex: 1, backgroundColor: colors.background }}>
     <Text>Carregando</Text>;
    </View>
  )
}