// DealerCharacter.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// Map expressions to character image assets
const dealerImages = {
  talking: require('../../assets/v2/avatars/dealer_talking.png'),
  eyesClosed: require('../../assets/v2/avatars/dealer_eyes_closed.png'),
  neutral: require('../../assets/v2/avatars/dealer_neutral.png'),
};

export default function DealerCharacter({ expression = 'neutral' }) {
  const dealerSource = dealerImages[expression] || dealerImages.neutral;

  return (
    <View style={styles.container}>
      <Image source={dealerSource} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});
