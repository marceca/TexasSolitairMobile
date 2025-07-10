import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function QuestionsCommentsButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Questions / Comments</Text>
    </TouchableOpacity>
  );
}
