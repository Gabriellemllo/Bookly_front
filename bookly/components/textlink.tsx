import React from 'react';
import { Platform, Text, Pressable } from 'react-native';

type TextLinkProps = {
  onPress: () => void;
  children: React.ReactNode;
  style?: any;
  hoverColor?: string;
};

export function TextLink({ onPress, children, style, hoverColor = '#00FF99' }: TextLinkProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  if (Platform.OS !== 'web') {
    return (
      <Text onPress={onPress} style={style}>
        {children}
      </Text>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={({ pressed }) => [
        style,
        isHovered && { color: hoverColor }
      ]}
    >
      <Text style={[style, isHovered && { color: hoverColor }]}>
        {children}
      </Text>
    </Pressable>
  );
}
