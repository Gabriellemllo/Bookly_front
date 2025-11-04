import { useTheme } from 'react-native-paper';
import { Text, View } from 'react-native';

export default function RegisterScreen() {
  const { colors } = useTheme();
  return (
  <View style={{ flex: 1, backgroundColor: colors.background }}>
    <Text>Register Screen</Text>
  </View>
  )
}
