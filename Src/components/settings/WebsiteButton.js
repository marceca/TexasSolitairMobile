import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function WebsiteButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Visit Website</Text>
    </TouchableOpacity>
  );
}
