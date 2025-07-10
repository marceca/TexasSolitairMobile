// GameScreenV2.js
import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DealerCharacter from '../../components/v2/DealerCharacter';

// TEMPORARY placeholder paths until TutorialManager and useTutorial are ready
const tutorialStep = 1; // will come from useTutorial hook
const dealerExpression = 'talking';
const dialogue = 'Welcome to Stick or Switch Poker! Pick a hand to begin.';

export default function GameScreenV2() {
  // Placeholder 6 hands (card back images)
  const hands = Array(6).fill(require('../../assets/v2/backofthecards/Logo_Card_Back_FINAL.png'));

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/v2/backgrounds/default_bg.png')} style={styles.bg} />
      <Image source={require('../../assets/v2/tables/Poker_Table.png')} style={styles.table} />

      {/* Render 6 card back hands */}
      <View style={styles.handRow}>
        {hands.map((img, i) => (
          <Image key={i} source={img} style={styles.cardBack} />
        ))}
      </View>

      {/* Player hand (face-up placeholder for now) */}
      <View style={styles.playerHand}>
        <Image source={require('../../assets/v2/cards/8_of_clubs.png')} style={styles.cardFace} />
        <Image source={require('../../assets/v2/cards/9_of_hearts.png')} style={styles.cardFace} />
      </View>

      {/* Dealer */}
      <DealerCharacter expression={dealerExpression} />
      <Text style={styles.dialogue}>{dialogue}</Text>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.stickBtn}>
          <Text style={styles.btnText}>Stick</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.switchBtn}>
          <Text style={styles.btnText}>Switch</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  table: {
    width: '100%',
    height: 220,
    resizeMode: 'contain',
    marginTop: 20,
  },
  handRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
  cardBack: {
    width: 50,
    height: 75,
  },
  playerHand: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  cardFace: {
    width: 60,
    height: 90,
    marginHorizontal: 5,
  },
  dialogue: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 10,
  },
  stickBtn: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
  },
  switchBtn: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
