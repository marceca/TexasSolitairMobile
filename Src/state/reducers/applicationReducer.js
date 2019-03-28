import React from 'react';
import * as types from '../actions/actions';
import {View, Image, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';
import STARTING_DECK from '../../assets/deck';
import * as getHands from '../helpers/functionsHelpers';
import constants from '../../assets/Constants';
import * as dbCalls from '../../database/db';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const deck = STARTING_DECK.slice();

const initState = {
  play: 1,
  dealt: false,
  deck: deck,
  handsDisplay: [[],[],[],[],[],[],[]],
  handObjects: [[],[],[],[],[],[],[]],
  communityCardsValue: [],
  communityCards: [],
  userHand: [],
  priorHands: {},
  chosenHand: true,
  choseHandThisTurn: true,
  chooseOncePerTurn: false,
  cardBack: constants.cardBackOptions['red'],
  profilePicture: '',
  reset: false,
  stick: true,
  switch: true,
  name: null,
  coins: null,
  bet: 50,
  betSize: 50
}

// Sort user hand by card value
function userSort(userSorting) {
  for(let i = 0; i < userSorting.length; i++) {
    if(i != userSorting.length - 1) {
      if(userSorting[i][0].value > userSorting[i + 1][0].value) {
        [userSorting[i], userSorting[i + 1]] = [userSorting[i + 1], userSorting[i]]
        userSort(userSorting)
      }
    }
  }
  return userSorting;
}

// Sort computer hand by card value
function computerSort(compSorting) {
  for(let i = 0; i < compSorting.wholeHand.length; i++) {
    if(i != compSorting.wholeHand.length - 1) {
      if(compSorting.wholeHand[i] > compSorting.wholeHand[i + 1]) {
        [compSorting.wholeHand[i], compSorting.wholeHand[i + 1]] = [compSorting.wholeHand[i + 1], compSorting.wholeHand[i]]
        computerSort(compSorting)
      }
    }
  }
  return compSorting
}

const applicationReducer = (state = initState, action)=> {
  switch (action.type) {

    // USER
    case types.UPDATEUSER:
      const updateUserState = Object.assign({}, state);
      updateUserState.name = action.userName;
      updateUserState.coins = action.userCoins
    return updateUserState

    // SOME SETTINGS
    case types.CHANGECARDBACK:
      const changeCardBackState =  Object.assign({}, state);
      changeCardBackState.cardBack = constants.cardBackOptions[action.cardBack];
    return changeCardBackState

    case types.UPDATENUMBEROFHANDS:
      const updateNumberOfHandsState = Object.assign({}, state);
      let updateHandObject = [];
      let updateDisplayObject = [];
      for(let i = 0; i < action.numberOfHands; i++) {
        updateHandObject.push([]);
        updateDisplayObject.push([]);
      }

      updateNumberOfHandsState.handsDisplay = updateDisplayObject;
      updateNumberOfHandsState.handObjects = updateHandObject;
    return updateNumberOfHandsState;

    // BETTINGS CONTROLS

    case types.UPDATEBET:
      const updateBetState = Object.assign({}, state);
      updateBetState.bet = action.num;
    return updateBetState;

    case types.INCREASEBET:
      const increaseBetState = Object.assign({}, state);
      increaseBetState.bet += increaseBetState.betSize;
    return increaseBetState;

    case types.DECREASEBET:
      const decreaseBetState = Object.assign({}, state);
      decreaseBetState.bet -= decreaseBetState.betSize;
    return decreaseBetState;


    // GAME CONTROLS
    case types.DEAL:
      const dealState = Object.assign({}, state);
      let card, ranNum;
      let cardsEach = 0
      if(dealState.dealt === false) {
        while(cardsEach < 2) {
          for(let i = 0; i < dealState.handsDisplay.length; i++) {
            // Random number for each card
            ranNum = Math.floor(Math.random() * (dealState.deck.length))
            // Random card from ranNum
            card = dealState.deck.splice(ranNum, 1)
            dealState.handObjects[i].push(card)
            dealState.handsDisplay[i].push(<Image style={styles.cardImage}  key={card[0].name}  source={dealState.cardBack} />)
          }
          cardsEach++
          dealState.userHand = dealState.handObjects[dealState.handObjects.length - 1];
        }
        dealState.handsDisplay[dealState.handsDisplay.length - 1] = []
        dealState.handsDisplay[dealState.handsDisplay.length - 1].push(<Image key={dealState.userHand[0][0].name} style={styles.cardImage}  source={dealState.userHand[0][0].img} />);
        dealState.handsDisplay[dealState.handsDisplay.length - 1].push(<Image key={dealState.userHand[1][0].name} style={styles.cardImage}  source={dealState.userHand[1][0].img} />);
        dealState.dealt = true;
        dealState.play++;
      }
    return dealState;

    case types.USERHAND:
      const userHandState = Object.assign({}, state);
      if(!userHandState.priorHands[action.hand] && userHandState.dealt === true) {
        userHandState.userHand = userHandState.handObjects[action.hand];
        userHandState.priorHands[action.hand] = true;
        userHandState.handsDisplay[action.hand] = [];
        userHandState.handsDisplay[action.hand].push(<Image key={userHandState.userHand[0][0].name} style={styles.cardImage}  source={userHandState.userHand[0][0].img} />);
        userHandState.handsDisplay[action.hand].push(<Image key={userHandState.userHand[1][0].name} style={styles.cardImage} source={userHandState.userHand[1][0].img} />);
        userHandState.chosenHand = action.hand + 1;
        [userHandState.handsDisplay[userHandState.handsDisplay.length - 1][0], userHandState.handsDisplay[action.hand][0]] = [userHandState.handsDisplay[action.hand][0], userHandState.handsDisplay[userHandState.handsDisplay.length - 1][0]];
        [userHandState.handsDisplay[userHandState.handsDisplay.length - 1][1], userHandState.handsDisplay[action.hand][1]] = [userHandState.handsDisplay[action.hand][1], userHandState.handsDisplay[userHandState.handsDisplay.length - 1][1]];
        [userHandState.handObjects[userHandState.handsDisplay.length - 1], userHandState.handObjects[action.hand]] = [userHandState.handObjects[action.hand], userHandState.handObjects[userHandState.handsDisplay.length - 1]]
        userHandState.choseHandThisTurn = true;
        userHandState.chooseOncePerTurn = true;
      }
    return userHandState;

    case types.ALLOWSWITCH:
      const allowSwitchState = Object.assign({}, state);
      if(allowSwitchState.chooseOncePerTurn === false) {
        allowSwitchState.choseHandThisTurn = false;
        allowSwitchState.chooseOncePerTurn = true;
      }
    return allowSwitchState

    case types.FLOP:
      const flopState = Object.assign({}, state);
      let flop = 0;
      if(flopState.chosenHand != false && flopState.choseHandThisTurn === true) {
        console.log('in if statemetn')
        while(flop < 3) {
          // Random number for each card
          ranNum = Math.floor(Math.random() * (flopState.deck.length))
          // Random card from ranNum
          card = flopState.deck.splice(ranNum, 1)
          flopState.communityCardsValue.push(card)
          flopState.communityCards.push(<View key={card[0].name} style={styles.cardImageContainer}><Image style={styles.cardImageBoard} source={card[0].img} /></View>)
          flop++
        }
        flopState.play++;
      }
      console.log('after loop state ', flopState)
      flopState.choseHandThisTurn = true;
      flopState.chooseOncePerTurn = false;
    return flopState;

    case types.TURN:
      const turnState = Object.assign({}, state);
      // Random number for each card
      ranNum = Math.floor(Math.random() * (turnState.deck.length))
      // Random card from ranNum
      card = turnState.deck.splice(ranNum, 1)
      turnState.communityCardsValue.push(card)
      turnState.communityCards.push(<View key={card[0].name} style={styles.cardImageContainer}><Image style={styles.cardImageBoard} key={card[0].name} source={card[0].img} /></View>)
      turnState.play++;
      turnState.choseHandThisTurn = true;
      turnState.chooseOncePerTurn = false;
    return turnState;

    case types.RIVER:
      const riverState = Object.assign({}, state);
      // Random number for each card
      ranNum = Math.floor(Math.random() * (riverState.deck.length))
      // Random card from ranNum
      card = riverState.deck.splice(ranNum, 1)
      riverState.communityCardsValue.push(card)
      riverState.communityCards.push(<View key={card[0].name} style={styles.cardImageContainer}><Image style={styles.cardImageBoard} key={card[0].name} source={card[0].img} /></View>)
      riverState.play++;
      riverState.choseHandThisTurn = true;
      riverState.chooseOncePerTurn = false;
    return riverState;

    case types.RESULTS:
      const resultsState = Object.assign({}, state);
      // Show reset button
      resultsState.reset = true;
      resultsState.stick = false;
      resultsState.switch = false;
      // Flip all cards
      for(let i = 0; i <  resultsState.handsDisplay.length - 1; i++) {
        resultsState.handsDisplay[i] = [];
        resultsState.handsDisplay[i].push(<Image key={resultsState.handObjects[i][0][0].name} style={styles.cardImageBoard} source={resultsState.handObjects[i][0][0].img} />);
        resultsState.handsDisplay[i].push(<Image key={resultsState.handObjects[i][1][0].name} style={styles.cardImageBoard} source={resultsState.handObjects[i][1][0].img} />);
      }

      // Get user total cards including community
      for(let i = 0; i < resultsState.communityCards.length; i++) {
        resultsState.userHand.push(resultsState.communityCardsValue[i])
      }

      // Test hands for computer results
      // resultsState.handObjects = [
      //   // 1st comp hand
      //   [
      //     [{
      //     value: 10,
      //     name: 'Two of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/2C.png'
      //   }],
      //   [{
      //     value: 11,
      //     name: 'Three of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/3C.png'
      //   }]],
      //   [
      //     [{
      //     value: 1,
      //     name: 'Two of Clubs',
      //     suit: 'Diamonds',
      //     img: '/cards/2C.png'
      //   }],
      //   [{
      //     value: 11,
      //     name: 'Three of Clubs',
      //     suit: 'Diamonds',
      //     img: '/cards/3C.png'
      //   }]],
      //   // dead comp hand
      //   [
      //     [{
      //     value: 2,
      //     name: 'Two of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/2C.png'
      //   }],
      //   [{
      //     value: 3,
      //     name: 'Three of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/3C.png'
      //   }]],
      // ]

      // // // // Changing community card value for testing
      // resultsState.communityCardsValue = [
      //   [{
      //     value: 12,
      //     name: 'Four of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/2C.png'
      //   }],
      //   [{
      //     value: 13,
      //     name: 'Five of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/3C.png'
      //   }],
      //   [{
      //     value: 14,
      //     name: 'Nine of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/4C.png'
      //   }],
      //   [{
      //     value: 15,
      //     name: 'Fve of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/5C.png'
      //   }],
      //   [{
      //     value: 7,
      //     name: 'Six of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/6C.png'
      //   }]
      // ]

      // // // For testing user results
      // resultsState.userHand = [
      //   [{
      //     value: 10,
      //     name: 'Two of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/2C.png'
      //   }],
      //   [{
      //     value: 11,
      //     name: 'Three of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/3C.png'
      //   }],
      //   [{
      //     value: 12,
      //     name: 'Four of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/2C.png'
      //   }],
      //   [{
      //     value: 13,
      //     name: 'Five of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/3C.png'
      //   }],
      //   [{
      //     value: 14,
      //     name: 'Nine of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/4C.png'
      //   }],
      //   [{
      //     value: 5,
      //     name: 'Fve of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/5C.png'
      //   }],
      //   [{
      //     value: 7,
      //     name: 'Six of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/6C.png'
      //   }]
      // ]

      // Sort user hand
      userSort(resultsState.userHand)

      // Get user results
      let userResult = getHands.getUserResults(resultsState.userHand);
      
      // Get computer results
      let computerResult = getHands.getComputerResults(resultsState);

      console.log('user result ', userResult)
      console.log('computer result ', computerResult)

      if(userResult.score > computerResult[0].score) {
        console.log('Player wins');
        let newCoins = (resultsState.coins + resultsState.bet);
        resultsState.coins = newCoins;
        dbCalls.updateUserCoins(newCoins);
      }
      if(computerResult[0].score > userResult.score) {
        console.log(`Computer hand number ${computerResult[0].computerHand} won`);
        let newCoins = (resultsState.coins - resultsState.bet);
        resultsState.coins = newCoins;
        dbCalls.updateUserCoins(newCoins);
      }

      if(userResult.score === computerResult[0].score) {

        // Check one pair and two pair winning hand
        if(userResult.score === 1000 || userResult.score === 2000) {
          var tie = true;
          for(let i = 0; i < userResult.highPairs.length; i++) {
            if(userResult.highPairs[userResult.highPairs.length - 1 - i] > computerResult[0].highPairs[computerResult[0].highPairs - 1 - i]) {
              console.log('Player wins one pair or two pair');
              let newCoins = (resultsState.coins + resultsState.bet);
              resultsState.coins = newCoins;
              dbCalls.updateUserCoins(newCoins);
              tie = false;
              break;
            }
            if(userResult.highPairs[userResult.highPairs.length - 1 - i] < computerResult[0].highPairs[computerResult[0].highPairs - 1 - i]) {
              console.log(`a pair or two pair computer hand number ${computerResult[0].computerHand} won`);
              let newCoins = (resultsState.coins - resultsState.bet);
              resultsState.coins = newCoins;
              dbCalls.updateUserCoins(newCoins);
              tie = false;
              break;
            }
          }
          if(tie === true) {
            for(let i = 0; i < userResult.bestFiveCards.length; i++) {
              if(userResult.bestFiveCards[i] > computerResult[0].bestFiveCards[i]) {
                console.log(`Player wins high card one pair or Two pair`);
                let newCoins = (resultsState.coins + resultsState.bet);
                resultsState.coins = newCoins;
                dbCalls.updateUserCoins(newCoins);
                tie = false;
                break;
              }
              if(userResult.bestFiveCards[i] < computerResult[0].bestFiveCards[i]) {
                console.log(`one pair or two pair high card computer hand number ${computerResult[0].computerHand} won`);
                let newCoins = (resultsState.coins - resultsState.bet);
                resultsState.coins = newCoins;
                dbCalls.updateUserCoins(newCoins);
                tie = false;
                break;
              }
            }
          }
          if(tie === true) {
            console.log('One pair or Two pair tie');            
          }
        }

      // Check three of a kind winning hand
      if(userResult.score === 3000) {
        console.log('three of a kind')
        if(userResult.highThreeOfAKind[0] > computerResult[0].highThreeOfAKind[0]) {
          console.log(`Player wins three of a kind ${userResult.highThreeOfAKind[0]}`);
          let newCoins = (resultsState.coins + resultsState.bet);
          resultsState.coins = newCoins;
          dbCalls.updateUserCoins(newCoins);
        }
        if(userResult.highThreeOfAKind[0] < computerResult[0].highThreeOfAKind[0]) {
          console.log(`computer hand number ${computerResult[0].computerHand} won with three of a kind ${computerResult[0].highThreeOfAKind[0]}`)
        }
        if(userResult.highThreeOfAKind[0] === computerResult[0].highThreeOfAKind[0]) {
          var tie = true;
          for(let i = 0; i < userResult.bestFiveCards.length; i++) {
            if(userResult.bestFiveCards[i] > computerResult[0].bestFiveCards[i]) {
              console.log(`Player wins high card three of a kind ${userResult.highThreeOfAKind[0]}`);
              let newCoins = (resultsState.coins + resultsState.bet);
              resultsState.coins = newCoins;
              dbCalls.updateUserCoins(newCoins);
              tie = false;
              break;
            }
            if(userResult.bestFiveCards[i] < computerResult[0].bestFiveCards[i]) {
              console.log(`Computer hand number ${computerResult[0].computerHand} won with three of a kind ${computerResult[0].highThreeOfAKind[0]}`);
              let newCoins = (resultsState.coins - resultsState.bet);
              resultsState.coins = newCoins;
              dbCalls.updateUserCoins(newCoins);
              tie = false;
              break;
            }
          }
          if(tie === true) {
            console.log(`Tie three of a kind with ${userResult.highThreeOfAKind[0]}`)
          }
        }
      }

      // Check winning hand of a straight
      if(userResult.score === 4000) {
        if(userResult.bestFiveCards[4] > computerResult[0].bestFiveCards[4]) {
          console.log(`Player wins with straight to the ${userResult.bestFiveCards[4]}`);
          let newCoins = (resultsState.coins + resultsState.bet)
          resultsState.coins = newCoins
          dbCalls.updateUserCoins(newCoins)
        }
        if(userResult.bestFiveCards[4] < computerResult[0].bestFiveCards[4]) {
          console.log(`Computer wins with straight to the ${computerResult[0].bestFiveCards[4]}`);
          let newCoins = (resultsState.coins - resultsState.bet);
          resultsState.coins = newCoins;
          dbCalls.updateUserCoins(newCoins);
        }
        if(userResult.bestFiveCards[4] === computerResult[0].bestFiveCards[4]) {
          console.log(`Tie hand with a straight to the ${userResult.bestFiveCards[4]}`);
        }
      }

      // Check winning hand of a flush
      if(userResult.score === 5000) {
        var tie = true;
        if(userResult.bestFiveCards[4] > computerResult[0].bestFiveCards[4]) {
          console.log(`Player wins with flush with high card ${userResult.bestFiveCards[4]}`);
          let newCoins = (resultsState.coins + resultsState.bet)
          resultsState.coins = newCoins
          dbCalls.updateUserCoins(newCoins)
          tie = false;
        }
        if(userResult.bestFiveCards[4] < computerResult[0].bestFiveCards[4]) {
          console.log(`Computer wins with flush with high card ${computerResult[0].bestFiveCards[4]}`);
          let newCoins = (resultsState.coins - resultsState.bet);
          resultsState.coins = newCoins;
          dbCalls.updateUserCoins(newCoins);
          tie = false;
        }
        if(tie === true) {
          for(let i = 0; i < userResult.bestFiveCards.length; i++) {
            if(userResult.bestFiveCards[userResult.bestFiveCards.length - i - 1] > computerResult[0].bestFiveCards[computerResult[0].bestFiveCards.length - i - 1]) {
              console.log(`Player wins with a flush with high card ${userResult.bestFiveCards[4]}`);
              let newCoins = (resultsState.coins + resultsState.bet)
              resultsState.coins = newCoins
              dbCalls.updateUserCoins(newCoins)
              tie = false;
              break;
            }
            if(userResult.bestFiveCards[userResult.bestFiveCards.length - i - 1] < computerResult[0].bestFiveCards[computerResult[0].bestFiveCards.length - i - 1]) {
              console.log(`Computer wins with a flush with high card ${computerResult[0].bestFiveCards[4]}`);
              let newCoins = (resultsState.coins - resultsState.bet);
              resultsState.coins = newCoins;
              dbCalls.updateUserCoins(newCoins);
              tie = false;
              break;
            }
          }
          if(tie === true) {
            console.log(`Tie hand with a flush to the ${userResult.bestFiveCards[4]}`)
          }
        }
      }

      // Check winning had full house
      if(userResult.score === 6000) {
        var tie = true;
        if(userResult.highThreeOfAKind[0] > computerResult[0].highThreeOfAKind[0]) {
          console.log(`Player won with a full house ${userResult.highThreeOfAKind[0]}'s full of ${Math.max(userResult.highPairs)}'s`);
          let newCoins = (resultsState.coins + resultsState.bet)
          resultsState.coins = newCoins
          dbCalls.updateUserCoins(newCoins)
          tie = false;
        }
        if(userResult.highThreeOfAKind[0] < computerResult[0].highThreeOfAKind[0]) {
          console.log(`Computer won with a full house ${computerResult[0].highThreeOfAKind[0]}'s full of ${Math.max(computerResult[0].highPairs)}'s`);
          let newCoins = (resultsState.coins - resultsState.bet);
          resultsState.coins = newCoins;
          dbCalls.updateUserCoins(newCoins);
          tie = false;
        }
        if(tie === true) {
          if(Math.max(userResult.highPairs) > Math.max(computerResult[0].highPairs)) {
            console.log(`Player won with a full house ${userResult.highThreeOfAKind[0]}'s full of ${Math.max(userResult.highPairs)}'s`);
            let newCoins = (resultsState.coins + resultsState.bet)
            resultsState.coins = newCoins
            dbCalls.updateUserCoins(newCoins)
            tie = false;
          }
          if(Math.max(userResult.highPairs) < Math.max(computerResult[0].highPairs)) {
            console.log(`Computer won with a full house ${computerResult[0].highThreeOfAKind[0]}'s full of ${Math.max(computerResult[0].highPairs)}'s`);
            let newCoins = (resultsState.coins - resultsState.bet);
            resultsState.coins = newCoins;
            dbCalls.updateUserCoins(newCoins);
            tie = false;
          }
        }
        if(tie === true) {
          console.log(`Tie full house ${userResult.highThreeOfAKind[0]}'s full of ${Math.max(userResult.highPairs)}'s`)
        }
      }

      // Check winning hand four of a kind
      if(userResult.score === 7000) {
        var tie = true;
        if(userResult.highFourOfAKind[0] > computerResult[0].highFourOfAKind[0]) {
          console.log(`Player wins with a four of a kind ${userResult.highFourOfAKind[0]}'s`);
          let newCoins = (resultsState.coins + resultsState.bet)
          resultsState.coins = newCoins
          dbCalls.updateUserCoins(newCoins)
          tie = false;
        }
        if(userResult.highFourOfAKind[0] < computerResult[0].highFourOfAKind[0]) {
          console.log(`Computer wins with a four of a kind ${computerResult[0].highFourOfAKind[0]}'s`);
          let newCoins = (resultsState.coins - resultsState.bet);
          resultsState.coins = newCoins;
          dbCalls.updateUserCoins(newCoins);
          tie = false;
        }
        if(tie === true) {
          if(userResult.highCard > computerResult[0].highCard) {
          console.log(`Player wins with a four of a kind ${userResult.highFourOfAKind[0]}'s`);
          let newCoins = (resultsState.coins + resultsState.bet)
          resultsState.coins = newCoins
          dbCalls.updateUserCoins(newCoins)
          tie = false;
          }
          if(userResult.highCard < computerResult[0].highCard) {
            console.log(`Computer wins with a four of a kind ${computerResult[0].highFourOfAKind[0]}'s`);
            let newCoins = (resultsState.coins - resultsState.bet);
            resultsState.coins = newCoins;
            dbCalls.updateUserCoins(newCoins);
            tie = false;
          }
        }
        if(tie === true) {
          console.log(`Tie four of a kind ${userResult.highCard[0]}'s`)
        }
      }

      // Check winning hand straight flush
      if(userResult.score === 8000) {
        if(userResult.highCard > computerResult[0].highCard) {
          console.log(`Player wins the a straight flush to ${userResult.highCard}`);
          let newCoins = (resultsState.coins + resultsState.bet)
          resultsState.coins = newCoins
          dbCalls.updateUserCoins(newCoins)
          tie = false;
        }
        if(userResult.highCard < computerResult[0].highCard) {
          console.log(`Computer wins the a straight flush to ${computerResult[0].highCard}`);
          let newCoins = (resultsState.coins - resultsState.bet);
          resultsState.coins = newCoins;
          dbCalls.updateUserCoins(newCoins);
          tie = false;
        }
        if(userResult.highCard === computerResult[0].highCard) {
          console.log(`Tie straight flush to the ${userResult.highCard}`);
        }
      }
    }

    return resultsState

    // START A NEW GAME
    case types.RESET:
      const resetState = Object.assign({}, state);
      const newDeck = STARTING_DECK.slice();
      const handsAmount = resetState.handsDisplay.length;
      resetState.play = 1;
      resetState.dealt = false; 
      resetState.deck = newDeck;
      resetState.handsDisplay = [];
      resetState.handObjects = [];
      for(let i = 0; i < handsAmount; i++) {
        resetState.handObjects.push([]);
        resetState.handsDisplay.push([])
      }
      resetState.communityCardsValue = [];
      resetState.communityCards = [];
      resetState.userHand = [];
      resetState.priorHands = {};
      resetState.chosenHand = true;
      resetState.choseHandThisTurn = true;
      resetState.chooseOncePerTurn = false;
      resetState.stick = true;
      resetState.switch = true;
      resetState.reset = false;
    return resetState;

  default:
    return state
  }
}

const styles = StyleSheet.create({
  cardImage: {
    width: undefined,
    height: undefined,
    flex: 1,
    resizeMode: 'cover',
  },
  cardImageContainer: {
    width: 50,
    height: 75,
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: screenHeight / 6
  },
  cardImageBoard: {
    width: undefined,
    height: undefined,
    flex: 1,
    resizeMode: 'contain',
  }
})

export default applicationReducer;