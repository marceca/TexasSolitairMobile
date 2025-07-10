import React from 'react';
import { View, Switch, Text } from 'react-native';

export default function ShowCardsToggle({ value, onValueChange }) {
  return (
    <View>
      <Text>Show Cards</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}
