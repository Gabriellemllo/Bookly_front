import { useTheme } from 'react-native-paper'; // para acessar as cores do tema
import { Text, View,Image} from 'react-native';
import { Spinner } from '@/components/ui/spinner';
import styles from './styles';

const logo = require('../../../assets/images/logo_bookly.png');

export default function SplashTela() {
  const { colors } = useTheme(); // cor global do tema
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
         <Spinner size="large" color="grey" style={styles.spinner}/>
      </View>
  );
}