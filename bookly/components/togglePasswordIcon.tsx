import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

type TogglePasswordIconProps = {
  show: boolean;
  onToggle: () => void;
};

export function TogglePasswordIcon({ show, onToggle }: TogglePasswordIconProps) {
  return (
    <TouchableOpacity onPress={onToggle} style={{ paddingHorizontal: 8 }}>
      {show ? <EyeOff size={22} color="#888" /> : <Eye size={22} color="#888" />}
    </TouchableOpacity>
  );
}
