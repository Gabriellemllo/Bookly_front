import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './button.styles';

type CustomButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};

export function CustomButton({ onPress, title, disabled = false }: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
