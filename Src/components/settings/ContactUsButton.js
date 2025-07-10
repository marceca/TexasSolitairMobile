import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function ContactUsButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Contact Us</Text>
    </TouchableOpacity>
  );
}
