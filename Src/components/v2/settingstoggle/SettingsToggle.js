import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDiscardedCards } from '../../state/actions/settingsActions';

const SettingsToggle = () => {
  const dispatch = useDispatch();
  const isEnabled = useSelector(state => state.settings.showDiscardedCards);

  const toggleSwitch = () => {
    dispatch(toggleDiscardedCards());
  };

  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.label}>Show Discarded Cards</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    color: '#fff',
  },
});

export default SettingsToggle;
