import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function BackgroundsButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Change Background</Text>
    </TouchableOpacity>
  );
}
