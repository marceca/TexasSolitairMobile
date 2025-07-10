// SettingsPanelV2.js
import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import SFXToggle from './SettingsComponents/SFXToggle';
import ShowCardsToggle from './SettingsComponents/ShowCardsToggle';
import NumberOfHandsButton from './SettingsComponents/NumberOfHandsButton';
import BackgroundsButton from './SettingsComponents/BackgroundsButton';
import CardBacksButton from './SettingsComponents/CardBacksButton';
import HandRanksButton from './SettingsComponents/HandRanksButton';
import TutorialButton from './SettingsComponents/TutorialButton';
import ContactUsButton from './SettingsComponents/ContactUsButton';
import WebsiteButton from './SettingsComponents/WebsiteButton';

export default function SettingsPanelV2() {
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [showCards, setShowCards] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.header}>Settings</Text>

        <SFXToggle value={sfxEnabled} onValueChange={setSfxEnabled} />
        <ShowCardsToggle value={showCards} onValueChange={setShowCards} />

        <NumberOfHandsButton onPress={() => console.log('Open Number of Hands Modal')} />
        <BackgroundsButton onPress={() => console.log('Open Background Selector')} />
        <CardBacksButton onPress={() => console.log('Open Card Backs Selector')} />
        <HandRanksButton onPress={() => console.log('Show Hand Ranks Overlay')} />

        <TutorialButton onPress={() => console.log('Go to Tutorial')} />
        <ContactUsButton onPress={() => console.log('Open Contact Form')} />
        <WebsiteButton onPress={() => console.log('Visit Website')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  inner: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
