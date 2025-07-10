import React from 'react';
import { View, Switch, Text } from 'react-native';

export default function SFXToggle({ value, onValueChange }) {
  return (
    <View>
      <Text>SFX</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}
