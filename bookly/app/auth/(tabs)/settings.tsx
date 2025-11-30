import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Avatar, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/useAuthStore';

// CORES DO TEMA
const themeColors = {
  background: '#181B20', // Fundo principal
  card: '#26292E',       // Cinza neutro (removido o tom azulado) para melhor contraste
  textPrimary: '#FFFFFF',
  textSecondary: '#94a3b8',
  border: '#334155',
};

export default function Settings() {
  const router = useRouter();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/auth/login');
            } catch (error: any) {
              Alert.alert('Erro', error.message || 'Erro ao fazer logout');
            }
          },
        },
      ]
    );
  };

  // --- COMPONENTE DE CABEÇALHO REUTILIZÁVEL (Estilo Profile) ---
  const CustomHeader = ({ onBackPress }: { onBackPress?: () => void }) => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
        <Text style={styles.iconText}>{"<"}</Text> 
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Text style={styles.iconText}>...</Text> 
      </TouchableOpacity>
    </View>
  );

  // --- TELA "SOBRE" ---
  if (isAboutOpen) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Header igual ao Profile */}
          <CustomHeader onBackPress={() => setIsAboutOpen(false)} />

          <View style={styles.aboutBadgeContainer}>
            <View style={styles.aboutBadge}>
              <IconButton icon="alert-octagon" iconColor={themeColors.textPrimary} size={24} style={{ margin: 0 }} />
              <Text style={styles.aboutBadgeText}>Sobre o BOOKLY</Text>
            </View>
          </View>

          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              Bookly é um aplicativo mobile, semelhante ao aplicativo "Letterboxd", sendo voltado para livros que permite aos usuários descobrir, catalogar, avaliar e discutir suas leituras. Este é o repositório oficial do front-end, desenvolvido em React Native com Expo.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // --- TELA "CONFIGURAÇÕES" ---
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* Perfil Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View>
              <Avatar.Image 
                size={64} 
                source={{ uri: user?.profilePhotoUrl || 'https://i.pravatar.cc/100?img=5' }} 
              />
              <View style={styles.editIconBadge}>
                <IconButton icon="pencil" iconColor="#000" size={12} style={{ margin: 0 }} />
              </View>
            </View>
            <View style={styles.profileTexts}>
              <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
              <Text style={styles.userEmail}>{user?.email || ''}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <IconButton icon="logout" iconColor={themeColors.textPrimary} size={24} />
          </TouchableOpacity>
        </View>

        {/* Botão Sobre */}
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setIsAboutOpen(true)}
          activeOpacity={0.7}
        >
          <View style={styles.iconCircle}>
            <IconButton icon="alert-octagon" iconColor={themeColors.textPrimary} size={20} style={{ margin: 0 }} />
          </View>
          <Text style={styles.menuButtonText}>Sobre o BOOKLY</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <IconButton icon="twitter" iconColor={themeColors.textPrimary} size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <IconButton icon="google" iconColor={themeColors.textPrimary} size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <IconButton icon="apple" iconColor={themeColors.textPrimary} size={24} />
          </TouchableOpacity>
        </View>
        <Text style={styles.versionText}>Versão - 1.00.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  // --- Header Styles (Adaptados do Profile) ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
    paddingHorizontal: 5, // Ajuste fino para alinhar visualmente
  },
  iconButton: {
    padding: 10,
  },
  iconText: {
    color: 'white',
    fontSize: 24,
    // Se desejar a fonte mais fina ou grossa, ajuste o fontWeight aqui
  },
  
  // --- Profile Card ---
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: themeColors.card,
    borderRadius: 24,
    padding: 16,
    marginBottom: 30,
    elevation: 4, // Sombra reduzida para ficar mais flat como o Figma
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  editIconBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: themeColors.card,
  },
  profileTexts: {
    justifyContent: 'center',
  },
  userName: {
    color: themeColors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    color: themeColors.textSecondary,
    fontSize: 14,
  },
  
  // --- Menu Button ---
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.card,
    borderRadius: 20,
    padding: 16,
    gap: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: themeColors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '500',
  },
  
  // --- Footer ---
  footer: {
    alignItems: 'center',
    paddingBottom: 40, 
    marginTop: 'auto',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  socialBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Fundo bem sutil para os botões sociais
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionText: {
    color: themeColors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  
  // --- About Styles ---
  aboutBadgeContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  aboutBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.card, // Usando a nova cor de card
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: themeColors.border,
    gap: 8,
  },
  aboutBadgeText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '500',
  },
  aboutCard: {
    backgroundColor: themeColors.card, // Usando a nova cor de card
    padding: 32,
    borderRadius: 30,
    minHeight: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutText: {
    color: '#cbd5e1',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
});