import * as React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, useTheme, IconButton } from 'react-native-paper';

interface NavItem {
  name: string;
  icon: string;
  route: string;
}

interface BottomNavProps {
  items: NavItem[];
  onPress: (route: string) => void;
  activeRoute?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({ items, onPress, activeRoute }) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.elevation.level2 }]}> 
      {items.map((item) => (
        <TouchableOpacity
          key={item.route}
          style={styles.item}
          onPress={() => onPress(item.route)}
        >
          <IconButton
            icon={item.icon}
            size={26}
            iconColor={activeRoute === item.route ? theme.colors.primary : theme.colors.onSurfaceVariant}
            style={styles.icon}
          />
          <Text style={{ color: activeRoute === item.route ? theme.colors.primary : theme.colors.onSurfaceVariant, fontSize: 12 }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderColor: '#222',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    height: 60,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    margin: 0,
  },
});
