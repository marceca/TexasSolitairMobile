import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function NumberOfHandsButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Total Number of Hands</Text>
    </TouchableOpacity>
  );
}
