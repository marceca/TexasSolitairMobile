import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function HandRanksButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Hand Ranks</Text>
    </TouchableOpacity>
  );
}
