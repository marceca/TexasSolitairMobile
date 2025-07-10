import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function TutorialButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Tutorial</Text>
    </TouchableOpacity>
  );
}
