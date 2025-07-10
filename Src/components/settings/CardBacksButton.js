import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function CardBacksButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Change Card Backs</Text>
    </TouchableOpacity>
  );
}
