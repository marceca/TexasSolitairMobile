import React from 'react';
import * as types from '../actions/actions';
import {View, Image, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';
import STARTING_DECK from '../../assets/deck';
import * as getHands from '../helpers/functionsHelpers';
import constants from '../../assets/Constants';
import * as dbCalls from '../../database/db';
import * as ads from '../../advertisements/ads';

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
  tickets: null,
  bet: 50,
  betSize: 50,
  numOfHands: 'six',
  showCards: true,
  ladder: false,
  ladderNumber: null,
  sfx: true,
  winningHand: null,
  profile: false,
  numHands: false,
  numberOfWins: null,
  winsInARow: null,
  currentWinningStreak: null,
  handsPlayed: null,
  ladderWin: false
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

const applicationReducer = (state = initState, action)=> {
  switch (action.type) {

    // USER
    case types.UPDATEUSER:
      const updateUserState = Object.assign({}, state);
      updateUserState.name = action.userName;
      updateUserState.coins = action.userCoins;
      updateUserState.tickets = action.userTickets;
      updateUserState.ladderNumber = action.userLadder;
      updateUserState.handsPlayed = action.handsPlayed;
      updateUserState.numberOfWins = action.numberOfWins;
      updateUserState.currentWinningStreak = action.currentWinningStreak;
      updateUserState.winsInARow = action.winsInARow;
    return updateUserState

    case types.OPENCLOSEPROFILE:
      const openCloseProfileState = Object.assign({}, state);
      if(openCloseProfileState.profile === true) {
        openCloseProfileState.profile = false;
      } else {
        openCloseProfileState.profile = true;
      }
    return openCloseProfileState;

    // SETTINGS
    case types.CHANGECARDBACK:
      const changeCardBackState =  Object.assign({}, state);
      changeCardBackState.cardBack = constants.cardBackOptions[action.cardBack];
    return changeCardBackState

    case types.UPDATENUMBEROFHANDS:
      const updateNumberOfHandsState = Object.assign({}, state);
      if(updateNumberOfHandsState.ladder === false && updateNumberOfHandsState.dealt === false) {
        let updateHandObject = [];
        let updateDisplayObject = [];
        for(let i = 0; i < action.numberOfHands; i++) {
          updateHandObject.push([]);
          updateDisplayObject.push([]);
        }
        updateNumberOfHandsState.numOfHands = action.numHandsImage;
        updateNumberOfHandsState.handsDisplay = updateDisplayObject;
        updateNumberOfHandsState.handObjects = updateHandObject;
        updateNumberOfHandsState.numHands = false;
      }
    return updateNumberOfHandsState;

    case types.LADDER:
      const ladderState = Object.assign({}, state);
      if(ladderState.ladder === true) {
        ladderState.ladder = false;
      } else if(ladderState.ladder === false && ladderState.tickets > 0) {
        ladderState.tickets -= 1;
        console.log('ladder state tickets ',ladderState.tickets)
        dbCalls.ladderUseTicket(ladderState.tickets);
        ladderState.ladder = true;
        let updateHandObject = [];
        let updateDisplayObject = [];
        for(let i = 0; i < ladderState.ladderNumber + 1; i++) {
          updateHandObject.push([]);
          updateDisplayObject.push([]);
        }
        // ladderState.numOfHands = action.numHandsImage;
        ladderState.handsDisplay = updateDisplayObject;
        ladderState.handObjects = updateHandObject;
      }
    return ladderState;

    case types.SHOWHIDECARDS:
      const showHideCardsState = Object.assign({}, state);
      if(showHideCardsState.showCards === true && showHideCardsState.dealt === false) {
        showHideCardsState.showCards = false;
      } else {
        if(showHideCardsState.dealt === false) {
          showHideCardsState.showCards = true;
        }
      }
    return showHideCardsState;

    case types.ONOFFSFX:
      const onOffSFXState = Object.assign({}, state);
      if(onOffSFXState.sfx === true) {
        onOffSFXState.sfx = false;
      } else {
        onOffSFXState.sfx = true;
      }
    return onOffSFXState;
    
      // CHANGE NUMBER OF HANDS
      case types.NUMBEROFHANDS:
        const numberOfHandsState = Object.assign({}, state);
        if(numberOfHandsState.numHands === false) {
          numberOfHandsState.numHands = true;
        } else {
          numberOfHandsState.numHands = false;
        }
      return numberOfHandsState;

    // BETTINGS CONTROLS

    case types.UPDATEBET:
      const updateBetState = Object.assign({}, state);
      updateBetState.bet = action.num;
    return updateBetState;

    case types.INCREASEBET:
      const increaseBetState = Object.assign({}, state);
      console.log(typeof Number(increaseBetState.bet))
      if(increaseBetState.coins >= (Number(increaseBetState.bet) + increaseBetState.betSize) && increaseBetState.dealt === false) {
        increaseBetState.bet = Number(increaseBetState.bet) + increaseBetState.betSize;
      } else {
        if(increaseBetState.dealt === false) {
          increaseBetState.bet = increaseBetState.coins;
        }
      }
    return increaseBetState;

    case types.DECREASEBET:
      const decreaseBetState = Object.assign({}, state);
      if(decreaseBetState.bet - decreaseBetState.betSize >= 50 && decreaseBetState.dealt === false) {
        decreaseBetState.bet = Number(decreaseBetState.bet) - decreaseBetState.betSize;
      } else {
        if(decreaseBetState.dealt === false) {
          decreaseBetState.bet = 50;
        }
      }
    return decreaseBetState;


    // GAME CONTROLS
    case types.DEAL:
      const dealState = Object.assign({}, state);
      let card, ranNum;
      let cardsEach = 0
      if(Number(dealState.bet) < 50) {
        dealState.bet = 50;
      }
      if(Number(dealState.bet) > dealState.coins) {
        dealState.bet = dealState.coins;
      }
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
        let captureSwitchHand = [];
        if(userHandState.showCards === false) {
          captureSwitchHand.push(<Image key={userHandState.userHand[0][0].name} style={styles.cardImage}  source={userHandState.cardBack} />)
          captureSwitchHand.push(<Image key={userHandState.userHand[1][0].name} style={styles.cardImage}  source={userHandState.cardBack} />)
        }
        userHandState.handsDisplay[action.hand] = [];
        userHandState.handsDisplay[action.hand].push(<Image key={userHandState.userHand[0][0].name} style={styles.cardImage}  source={userHandState.userHand[0][0].img} />);
        userHandState.handsDisplay[action.hand].push(<Image key={userHandState.userHand[1][0].name} style={styles.cardImage} source={userHandState.userHand[1][0].img} />);
        userHandState.chosenHand = action.hand + 1;
        if(userHandState.showCards === false) {
          userHandState.handsDisplay[userHandState.handsDisplay.length - 1][0] = userHandState.handsDisplay[action.hand][0];
          userHandState.handsDisplay[userHandState.handsDisplay.length - 1][1] = userHandState.handsDisplay[action.hand][1];
          userHandState.handsDisplay[action.hand][0] = captureSwitchHand[0];
          userHandState.handsDisplay[action.hand][1] = captureSwitchHand[1];
        } else {
          [userHandState.handsDisplay[userHandState.handsDisplay.length - 1][0], userHandState.handsDisplay[action.hand][0]] = [userHandState.handsDisplay[action.hand][0], userHandState.handsDisplay[userHandState.handsDisplay.length - 1][0]];
          [userHandState.handsDisplay[userHandState.handsDisplay.length - 1][1], userHandState.handsDisplay[action.hand][1]] = [userHandState.handsDisplay[action.hand][1], userHandState.handsDisplay[userHandState.handsDisplay.length - 1][1]];
        }
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

    case types.UPDATECOINS:
      const updateCoinsState = Object.assign({}, state);
      updateCoinsState.coins = action.coins;
    return updateCoinsState;

    case types.RESULTS:
      const resultsState = Object.assign({}, state);
      // Show reset button
      resultsState.reset = true;
      // Turn off other buttons
      resultsState.stick = false;
      resultsState.switch = false;
      // Allow show cards and chaging of hand number
      resultsState.dealt = false;
      // Add to number of hands played
      resultsState.handsPlayed += 1;
      dbCalls.updateHandsPlayed(resultsState.handsPlayed);

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
      //     value: 5,
      //     name: 'Two of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/2C.png'
      //   }],
      //   [{
      //     value: 2,
      //     name: 'Three of Clubs',
      //     suit: 'Spades',
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

      // Changing community card value for testing
      // resultsState.communityCardsValue = [
      //   [{
      //     value: 1,
      //     name: 'Four of Clubs',
      //     suit: 'Clubs',
      //     img: '/cards/2C.png'
      //   }],
      //   [{
      //     value: 3,
      //     name: 'Five of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/3C.png'
      //   }],
      //   [{
      //     value: 14,
      //     name: 'Nine of Clubs',
      //     suit: 'Hearts',
      //     img: '/cards/4C.png'
      //   }],
      //   [{
      //     value: 9,
      //     name: 'Fve of Clubs',
      //     suit: 'Diamonds',
      //     img: '/cards/5C.png'
      //   }],
      //   [{
      //     value: 7,
      //     name: 'Six of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/6C.png'
      //   }]
      // ]

      // For testing user results
      // resultsState.userHand = [
      //   [{
      //     value: 1,
      //     name: 'Two of Clubs',
      //     suit: 'Clubs',
      //     img: '/cards/2C.png'
      //   }],
      //   [{
      //     value: 2,
      //     name: 'Three of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/3C.png'
      //   }],
      //   [{
      //     value: 3,
      //     name: 'Four of Clubs',
      //     suit: 'Hearts',
      //     img: '/cards/2C.png'
      //   }],
      //   [{
      //     value: 9,
      //     name: 'Five of Clubs',
      //     suit: 'Diamonds',
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
        resultsState.winningHand = resultsState.handObjects.length - 1;
        if(resultsState.ladder === false) {
          let newCoins = Math.ceil(resultsState.coins + (resultsState.bet * constants.winningsPercents[resultsState.handsDisplay.length]));
          resultsState.coins = newCoins;
          resultsState.numberOfWins += 1;
          resultsState.currentWinningStreak += 1;
          dbCalls.updateCurrentWinningStreak(resultsState.currentWinningStreak);
          if(resultsState.currentWinningStreak > resultsState.winsInARow) {
            resultsState.winsInARow += 1;
            dbCalls.updateWinsInARow(resultsState.currentWinningStreak);
          }
          dbCalls.updateUserCoins(newCoins);
          dbCalls.updateWins(resultsState.numberOfWins);
        } else {
          if(resultsState.ladderNumber < 9) {
            resultsState.ladderWin = true;
            dbCalls.updateLadder(resultsState.ladderNumber);
            resultsState.ladderNumber += 1;
          }
        }
        // Run ad for every 20 games won
        if(resultsState.numberOfWins % 20 === 0) {
          ads.runAd(resultsState);
        }
      }
      if(computerResult[0].score > userResult.score) {
        console.log(`Computer hand number ${computerResult[0].computerHand} won`);
        resultsState.winningHand = computerResult[0].computerHand - 1;
        resultsState.currentWinningStreak = 0;
        dbCalls.updateCurrentWinningStreak(0);
        if(resultsState.ladder === false) {
          let newCoins = (resultsState.coins - resultsState.bet);
          resultsState.coins = newCoins;
          dbCalls.updateUserCoins(newCoins);
        }
      }

      if(userResult.score === computerResult[0].score) {
        // Check high card winning hand
        if(userResult.score < 1000) {
          var tie = true;
          for(let i = 0; i < userResult.bestFiveCards.length; i++) {
            if(userResult.bestFiveCards[userResult.bestFiveCards.length - 1 - i] > computerResult[0].bestFiveCards[computerResult[0].bestFiveCards.length - 1 - i]) {
              console.log('Player wins with high cards');
              resultsState.winningHand = resultsState.handObjects.length - 1;
              if(resultsState.ladder === false) {
                let newCoins = Math.ceil(resultsState.coins + (resultsState.bet * constants.winningsPercents[resultsState.handsDisplay.length]));
                resultsState.coins = newCoins;
                resultsState.numberOfWins += 1;
                resultsState.currentWinningStreak += 1;
                dbCalls.updateCurrentWinningStreak(resultsState.currentWinningStreak);
                if(resultsState.currentWinningStreak > resultsState.winsInARow) {
                  resultsState.winsInARow += 1;
                  dbCalls.updateWinsInARow(resultsState.currentWinningStreak);
                }
                dbCalls.updateUserCoins(newCoins);
                dbCalls.updateWins(resultsState.numberOfWins);
              } else {
                if(resultsState.ladderNumber < 9) {
                  resultsState.ladderWin = true;
                  dbCalls.updateLadder(resultsState.ladderNumber);
                  resultsState.ladderNumber += 1;
                }
              }
              tie = false;
              // Run ad for every 20 games won
              if(resultsState.numberOfWins % 20 === 0) {
                ads.runAd(resultsState);
              }
              break;
            }
            if(userResult.bestFiveCards[userResult.bestFiveCards.length - 1 - i] < computerResult[0].bestFiveCards[computerResult[0].bestFiveCards.length - 1 - i]) {
              console.log('Computer wins with high cards');
              resultsState.winningHand = computerResult[0].computerHand - 1;
              resultsState.currentWinningStreak = 0;
              dbCalls.updateCurrentWinningStreak(0);
              if(resultsState.ladder === false) {
                let newCoins = (resultsState.coins - resultsState.bet);
                resultsState.coins = newCoins;
                dbCalls.updateUserCoins(newCoins);
              }
              tie = false;
              break;
            }
          }
          if(tie === true) {
            console.log('Tie hand with high cards');
          }
        }

        // Check one pair and two pair winning hand
        if(userResult.score === 1000 || userResult.score === 2000) {
          var tie = true;
          for(let i = 0; i < userResult.highPairs.length; i++) {
            if(userResult.highPairs[userResult.highPairs.length - 1 - i] > computerResult[0].highPairs[computerResult[0].highPairs.length - 1 - i]) {
              console.log('Player wins one pair or two pair');
              resultsState.winningHand = resultsState.handObjects.length - 1;
              if(resultsState.ladder === false) {
                let newCoins = Math.ceil(resultsState.coins + (resultsState.bet * constants.winningsPercents[resultsState.handsDisplay.length]));
                resultsState.coins = newCoins;
                resultsState.numberOfWins += 1;
                resultsState.currentWinningStreak += 1;
                dbCalls.updateCurrentWinningStreak(resultsState.currentWinningStreak);
                if(resultsState.currentWinningStreak > resultsState.winsInARow) {
                  resultsState.winsInARow += 1;
                  dbCalls.updateWinsInARow(resultsState.currentWinningStreak);
                }
                dbCalls.updateUserCoins(newCoins);
                dbCalls.updateWins(resultsState.numberOfWins);
              } else {
                if(resultsState.ladderNumber < 9) {
                  resultsState.ladderWin = true;
                  dbCalls.updateLadder(resultsState.ladderNumber);
                  resultsState.ladderNumber += 1;
                }
              }
              tie = false;
              // Run ad for every 20 games won
              if(resultsState.numberOfWins % 20 === 0) {
                ads.runAd(resultsState);
              }
              break;
            }
            if(userResult.highPairs[userResult.highPairs.length - 1 - i] < computerResult[0].highPairs[computerResult[0].highPairs.length - 1 - i]) {
              console.log(`a pair or two pair computer hand number ${computerResult[0].computerHand} won`);
              resultsState.winningHand = computerResult[0].computerHand - 1;
              resultsState.currentWinningStreak = 0;
              dbCalls.updateCurrentWinningStreak(0);
              if(resultsState.ladder === false) {
                let newCoins = (resultsState.coins - resultsState.bet);
                resultsState.coins = newCoins;
                dbCalls.updateUserCoins(newCoins);
              }
              tie = false;
              break;
            }
          }
          if(tie === true) {
            for(let i = 0; i < userResult.bestFiveCards.length; i++) {
              if(userResult.bestFiveCards[userResult.bestFiveCards.length - 1 - i] > computerResult[0].bestFiveCards[computerResult[0].bestFiveCards.length - 1 - i]) {
                console.log(`Player wins high card one pair or Two pair`);
                resultsState.winningHand = resultsState.handObjects.length - 1;
                if(resultsState.ladder === false) {
                  let newCoins = Math.ceil(resultsState.coins + (resultsState.bet * constants.winningsPercents[resultsState.handsDisplay.length]));
                  resultsState.coins = newCoins;
                  resultsState.numberOfWins += 1;
                  resultsState.currentWinningStreak += 1;
                  dbCalls.updateCurrentWinningStreak(resultsState.currentWinningStreak);
                  if(resultsState.currentWinningStreak > resultsState.winsInARow) {
                    resultsState.winsInARow += 1;
                    dbCalls.updateWinsInARow(resultsState.currentWinningStreak);
                  }
                  dbCalls.updateUserCoins(newCoins);
                  dbCalls.updateWins(resultsState.numberOfWins);
                } else {
                  if(resultsState.ladderNumber < 9) {
                    resultsState.ladderWin = true;
                    dbCalls.updateLadder(resultsState.ladderNumber);
                    resultsState.ladderNumber += 1;
                  }
                }
                tie = false;
                // Run ad for every 20 games won
                if(resultsState.numberOfWins % 20 === 0) {
                  ads.runAd(resultsState);
                }
                break;
              }
              if(userResult.bestFiveCards[userResult.bestFiveCards.length - 1 - i] < computerResult[0].bestFiveCards[computerResult[0].bestFiveCards.length - 1 - i]) {
                console.log(`one pair or two pair high card computer hand number ${computerResult[0].computerHand} won`);
                resultsState.winningHand = computerResult[0].computerHand - 1;
                resultsState.currentWinningStreak = 0;
                dbCalls.updateCurrentWinningStreak(0);
                if(resultsState.ladder === false) {
                  let newCoins = (resultsState.coins - resultsState.bet);
                  resultsState.coins = newCoins;
                  dbCalls.updateUserCoins(newCoins);
                }
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
          resultsState.winningHand = resultsState.handObjects.length - 1;
          if(resultsState.ladder === false) {
            let newCoins = Math.ceil(resultsState.coins + (resultsState.bet * constants.winningsPercents[resultsState.handsDisplay.length]));
            resultsState.coins = newCoins;
            resultsState.numberOfWins += 1;
            resultsState.currentWinningStreak += 1;
            dbCalls.updateCurrentWinningStreak(resultsState.currentWinningStreak);
            if(resultsState.currentWinningStreak > resultsState.winsInARow) {
              resultsState.winsInARow += 1;
              dbCalls.updateWinsInARow(resultsState.currentWinningStreak);
            }
            dbCalls.updateUserCoins(newCoins);
            dbCalls.updateWins(resultsState.numberOfWins);
          } else {
            if(resultsState.ladderNumber < 9) {
              resultsState.ladderWin = true;
              dbCalls.updateLadder(resultsState.ladderNumber);
              resultsState.ladderNumber += 1;
            }
          }
          // Run ad for every 20 games won
          if(resultsState.numberOfWins % 20 === 0) {
            ads.runAd(resultsState);
          }
        }
        if(userResult.highThreeOfAKind[0] < computerResult[0].highThreeOfAKind[0]) {
          console.log(`computer hand number ${computerResult[0].computerHand} won with three of a kind ${computerResult[0].highThreeOfAKind[0]}`)
          resultsState.winningHand = computerResult[0].computerHand - 1;
          resultsState.currentWinningStreak = 0;
          dbCalls.updateCurrentWinningStreak(0);
        }
        if(userResult.highThreeOfAKind[0] === computerResult[0].highThreeOfAKind[0]) {
          var tie = true;
          for(let i = 0; i < userResult.bestFiveCards.length; i++) {
            if(userResult.bestFiveCards[i] > computerResult[0].bestFiveCards[i]) {
              console.log(`Player wins high card three of a kind ${userResult.highThreeOfAKind[0]}`);
              resultsState.winningHand = resultsState.handObjects.length - 1;
              if(resultsState.ladder === false) {
                let newCoins = Math.ceil(resultsState.coins + (resultsState.bet * constants.winningsPercents[resultsState.handsDisplay.length]));
                resultsState.coins = newCoins;
                resultsState.numberOfWins += 1;
                resultsState.currentWinningStreak += 1;
                dbCalls.updateCurrentWinningStreak(resultsState.currentWinningStreak);
                if(resultsState.currentWinningStreak > resultsState.winsInARow) {
                  resultsState.winsInARow += 1;
                  dbCalls.updateWinsInARow(resultsState.currentWinningStreak);
                }
                dbCalls.updateUserCoins(newCoins);
                dbCalls.updateWins(resultsState.numberOfWins);
              } else {
                if(resultsState.ladderNumber < 9) {
                  resultsState.ladderWin = true;
                  dbCalls.updateLadder(resultsState.ladderNumber);
                  resultsState.ladderNumber += 1;
                }
              }
              tie = false;
              // Run ad for every 20 games won
              if(resultsState.numberOfWins % 20 === 0) {
                ads.runAd(resultsState);
              }
              break;
            }
            if(userResult.bestFiveCards[i] < computerResult[0].bestFiveCards[i]) {
              console.log(`Computer hand number ${computerResult[0].computerHand} won with three of a kind ${computerResult[0].highThreeOfAKind[0]}`);
              resultsState.winningHand = computerResult[0].computerHand - 1;
              resultsState.currentWinningStreak = 0;
              dbCalls.updateCurrentWinningStreak(0);
              if(resultsState.ladder === false) {
                let newCoins = (resultsState.coins - resultsState.bet);
                resultsState.coins = newCoins;
                dbCalls.updateUserCoins(newCoins);
              }
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
          resultsState.winningHand = resultsState.handObjects.length - 1;
          if(resultsState.ladder === false) {
            let newCoins = Math.ceil(resultsState.coins + (resultsState.bet * constants.winningsPercents[resultsState.handsDisplay.length]));
            resultsState.coins = newCoins;
            resultsState.numberOfWins += 1;
            resultsState.currentWinningStreak += 1;
            dbCalls.updateCurrentWinningStreak(resultsState.currentWinningStreak);
            if(resultsState.currentWinningStreak > resultsState.winsInARow) {
              resultsState.winsInARow += 1;
              dbCalls.updateWinsInARow(resultsState.currentWinningStreak);
            }
            dbCalls.updateUserCoins(newCoins);
            dbCalls.updateWins(resultsState.numberOfWins);
          } else {
            if(resultsState.ladderNumber < 9) {
              resultsState.ladderWin = true;
              dbCalls.updateLadder(resultsState.ladderNumber);
              resultsState.ladderNumber += 1;
            }
          }
          // Run ad for every 20 games won
          if(resultsState.numberOfWins % 20 === 0) {
            ads.runAd(resultsState);
          }
        }
        if(userResult.bestFiveCards[4] < computerResult[0].bestFiveCards[4]) {
          console.log(`Computer wins with straight to the ${computerResult[0].bestFiveCards[4]}`);
          resultsState.winningHand = computerResult[0].computerHand - 1;
          resultsState.currentWinningStreak = 0;
          dbCalls.updateCurrentWinningStreak(0);
          if(resultsState.ladder === false) {
            let newCoins = (resultsState.coins - resultsState.bet);
            resultsState.coins = newCoins;
            dbCalls.updateUserCoins(newCoins);
          }
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
          resultsState.winningHand = resultsState.handObjects.length - 1;
          if(resultsState.ladder === false) {
            let newCoins = Math.ceil(resultsState.coins + (resultsState.bet * constants.winningsPercents[resultsState.handsDisplay.length]));
            resultsState.coins = newCoins;
            resultsState.numberOfWins += 1;
            resultsState.currentWinningStreak += 1;
            dbCalls.updateCurrentWinningStreak(resultsState.currentWinningStreak);
            if(resultsState.currentWinningStreak > resultsState.winsInARow) {
              resultsState.winsInARow += 1;
              dbCalls.updateWinsInARow(resultsState.currentWinningStreak);
            }
            dbCalls.updateUserCoins(newCoins);
            dbCalls.updateWins(resultsState.numberOfWins);
          } else {
            if(resultsState.ladderNumber < 9) {
              resultsState.ladderWin = true;
              dbCalls.updateLadder(resultsState.ladderNumber);
              resultsState.ladderNumber += 1;
            }
          }
          tie = false;
          // Run ad for every 20 games won
          if(resultsState.numberOfWins % 20 === 0) {
            ads.runAd(resultsState);
          }
        }
        if(userResult.bestFiveCards[4] < computerResult[0].bestFiveCards[4]) {
          console.log(`Computer wins with flush with high card ${computerResult[0].bestFiveCards[4]}`);
          resultsState.winningHand = computerResult[0].computerHand - 1;
          resultsState.currentWinningStreak = 0;
          dbCalls.updateCurrentWinningStreak(0);
          if(resultsState.ladder === false) {
            let newCoins = (resultsState.coins - resultsState.bet);
            resultsState.coins = newCoins;
            dbCalls.updateUserCoins(newCoins);
          }
          tie = false;
        }
        if(tie === true) {
          for(let i = 0; i < userResult.bestFiveCards.length; i++) {
            if(userResult.bestFiveCards[userResult.bestFiveCards.length - i - 1] > computerResult[0].bestFiveCards[computerResult[0].bestFiveCards.length - i - 1]) {
              console.log(`Player wins with a flush with high card ${userResult.bestFiveCards[4]}`);
              resultsState.winningHand = resultsState.handObjects.length - 1;
              if(resultsState.ladder === false) {
                let newCoins = Math.ceil(resultsState.coins + (resultsState.bet * constants.winningsPercents[resultsState.handsDisplay.length]));
                resultsState.coins = newCoins;
                resultsState.numberOfWins += 1;
                resultsState.currentWinningStreak += 1;
                dbCalls.updateCurrentWinningStreak(resultsState.currentWinningStreak);
                if(resultsState.currentWinningStreak > resultsState.winsInARow) {
                  resultsState.winsInARow += 1;
                  dbCalls.updateWinsInARow(resultsState.currentWinningStreak);
                }
                dbCalls.updateUserCoins(newCoins);
                dbCalls.updateWins(resultsState.numberOfWins);
              } else {
                if(resultsState.ladderNumber < 9) {
                  resultsState.ladderWin = true;
                  dbCalls.updateLadder(resultsState.ladderNumber);
                  resultsState.ladderNumber += 1;
                }
              }
              tie = false;
              // Run ad for every 20 games won
              if(resultsState.numberOfWins % 20 === 0) {
                ads.runAd(resultsState);
              }
              break;
            }
            if(userResult.bestFiveCards[userResult.bestFiveCards.length - i - 1] < computerResult[0].bestFiveCards[computerResult[0].bestFiveCards.length - i - 1]) {
              console.log(`Computer wins with a flush with high card ${computerResult[0].bestFiveCards[4]}`);
              resultsState.winningHand = computerResult[0].computerHand - 1;
              resultsState.currentWinningStreak = 0;
              dbCalls.updateCurrentWinningStreak(0);
              if(resultsState.ladder === false) {
                let newCoins = (resultsState.coins - resultsState.bet);
                resultsState.coins = newCoins;
                dbCalls.updateUserCoins(newCoins);
              }
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
          resultsState.winningHand = resultsState.handObjects.length - 1;
          if(resultsState.ladder === false) {
            let newCoins = Math.ceil(resultsState.coins + (resultsState.bet * constants.winningsPercents[resultsState.handsDisplay.length]));
            resultsState.coins = newCoins;
            resultsState.numberOfWins += 1;
            resultsState.currentWinningStreak += 1;
            dbCalls.updateCurrentWinningStreak(resultsState.currentWinningStreak);
            if(resultsState.currentWinningStreak > resultsState.winsInARow) {
              resultsState.winsInARow += 1;
              dbCalls.updateWinsInARow(resultsState.currentWinningStreak);
            }
            dbCalls.updateUserCoins(newCoins);
            dbCalls.updateWins(resultsState.numberOfWins);
          } else {
            if(resultsState.ladderNumber < 9) {
              resultsState.ladderWin = true;
              dbCalls.updateLadder(resultsState.ladderNumber);
              resultsState.ladderNumber += 1;
            }
          }
          tie = false;
          // Run ad for every 20 games won
          if(resultsState.numberOfWins % 20 === 0) {
            ads.runAd(resultsState);
          }
        }
        if(userResult.highThreeOfAKind[0] < computerResult[0].highThreeOfAKind[0]) {
          console.log(`Computer won with a full house ${computerResult[0].highThreeOfAKind[0]}'s full of ${Math.max(computerResult[0].highPairs)}'s`);
          resultsState.winningHand = computerResult[0].computerHand - 1;
          resultsState.currentWinningStreak = 0;
          dbCalls.updateCurrentWinningStreak(0);
          if(resultsState.ladder === false) {
            let newCoins = (resultsState.coins - resultsState.bet);
            resultsState.coins = newCoins;
            dbCalls.updateUserCoins(newCoins);
          }
          tie = false;
        }
        if(tie === true) {
          if(Math.max(userResult.highPairs) > Math.max(computerResult[0].highPairs)) {
            console.log(`Player won with a full house ${userResult.highThreeOfAKind[0]}'s full of ${Math.max(userResult.highPairs)}'s`);
            resultsState.winningHand = resultsState.handObjects.length - 1;
            if(resultsState.ladder === false) {
              let newCoins = Math.ceil(resultsState.coins + (resultsState.bet * constants.winningsPercents[resultsState.handsDisplay.length]));
              resultsState.coins = newCoins;
              resultsState.numberOfWins += 1;
              resultsState.currentWinningStreak += 1;
              dbCalls.updateCurrentWinningStreak(resultsState.currentWinningStreak);
              if(resultsState.currentWinningStreak > resultsState.winsInARow) {
                resultsState.winsInARow += 1;
                dbCalls.updateWinsInARow(resultsState.currentWinningStreak);
              }
              dbCalls.updateUserCoins(newCoins);
              dbCalls.updateWins(resultsState.numberOfWins);
            } else {
              if(resultsState.ladderNumber < 9) {
                resultsState.ladderWin = true;
                dbCalls.updateLadder(resultsState.ladderNumber);
                resultsState.ladderNumber += 1;
              }
            }
            tie = false;
            // Run ad for every 20 games won
            if(resultsState.numberOfWins % 20 === 0) {
              ads.runAd(resultsState);
            }
          }
          if(Math.max(userResult.highPairs) < Math.max(computerResult[0].highPairs)) {
            console.log(`Computer won with a full house ${computerResult[0].highThreeOfAKind[0]}'s full of ${Math.max(computerResult[0].highPairs)}'s`);
            resultsState.winningHand = computerResult[0].computerHand - 1;
            resultsState.currentWinningStreak = 0;
            dbCalls.updateCurrentWinningStreak(0);
            if(resultsState.ladder === false) {
              let newCoins = (resultsState.coins - resultsState.bet);
              resultsState.coins = newCoins;
              dbCalls.updateUserCoins(newCoins);
            }
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
          resultsState.winningHand = resultsState.handObjects.length - 1;
          if(resultsState.ladder === false) {
            let newCoins = Math.ceil(resultsState.coins + (resultsState.bet * constants.winningsPercents[resultsState.handsDisplay.length]));
            resultsState.coins = newCoins;
            resultsState.numberOfWins += 1;
            resultsState.currentWinningStreak += 1;
            dbCalls.updateCurrentWinningStreak(resultsState.currentWinningStreak);
            if(resultsState.currentWinningStreak > resultsState.winsInARow) {
              resultsState.winsInARow += 1;
              dbCalls.updateWinsInARow(resultsState.currentWinningStreak);
            }
            dbCalls.updateUserCoins(newCoins);
            dbCalls.updateWins(resultsState.numberOfWins);
          } else {
            if(resultsState.ladderNumber < 9) {
              resultsState.ladderWin = true;
              dbCalls.updateLadder(resultsState.ladderNumber);
              resultsState.ladderNumber += 1;
            }
          }
          tie = false;
          // Run ad for every 20 games won
          if(resultsState.numberOfWins % 20 === 0) {
            ads.runAd(resultsState);
          }
        }
        if(userResult.highFourOfAKind[0] < computerResult[0].highFourOfAKind[0]) {
          console.log(`Computer wins with a four of a kind ${computerResult[0].highFourOfAKind[0]}'s`);
          resultsState.winningHand = computerResult[0].computerHand - 1;
          resultsState.currentWinningStreak = 0;
          dbCalls.updateCurrentWinningStreak(0);
          if(resultsState.ladder === false) {
            let newCoins = (resultsState.coins - resultsState.bet);
            resultsState.coins = newCoins;
            dbCalls.updateUserCoins(newCoins);
          }
          tie = false;
        }
        if(tie === true) {
          if(userResult.highCard > computerResult[0].highCard) {
            console.log(`Player wins with a four of a kind ${userResult.highFourOfAKind[0]}'s`);
            resultsState.winningHand = resultsState.handObjects.length - 1;
            if(resultsState.ladder === false) {
              let newCoins = Math.ceil(resultsState.coins + (resultsState.bet * constants.winningsPercents[resultsState.handsDisplay.length]));
              resultsState.coins = newCoins;
              resultsState.numberOfWins += 1;
              resultsState.currentWinningStreak += 1;
              dbCalls.updateCurrentWinningStreak(resultsState.currentWinningStreak);
              if(resultsState.currentWinningStreak > resultsState.winsInARow) {
                resultsState.winsInARow += 1;
                dbCalls.updateWinsInARow(resultsState.currentWinningStreak);
              }
              dbCalls.updateUserCoins(newCoins);
              dbCalls.updateWins(resultsState.numberOfWins);
            } else {
              if(resultsState.ladderNumber < 9) {
                resultsState.ladderWin = true;
                dbCalls.updateLadder(resultsState.ladderNumber);
                resultsState.ladderNumber += 1;
              }
            }
            tie = false;
            // Run ad for every 20 games won
            if(resultsState.numberOfWins % 20 === 0) {
              ads.runAd(resultsState);
            }
          }
          if(userResult.highCard < computerResult[0].highCard) {
            console.log(`Computer wins with a four of a kind ${computerResult[0].highFourOfAKind[0]}'s`);
            resultsState.winningHand = computerResult[0].computerHand - 1;
            resultsState.currentWinningStreak = 0;
            dbCalls.updateCurrentWinningStreak(0);
            if(resultsState.ladder === false) {
              let newCoins = (resultsState.coins - resultsState.bet);
              resultsState.coins = newCoins;
              dbCalls.updateUserCoins(newCoins);
            }
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
          resultsState.winningHand = resultsState.handObjects.length - 1;
          if(resultsState.ladder === false) {
            let newCoins = Math.ceil(resultsState.coins + (resultsState.bet * constants.winningsPercents[resultsState.handsDisplay.length]));
            resultsState.coins = newCoins;
            resultsState.numberOfWins += 1;
            resultsState.currentWinningStreak += 1;
            dbCalls.updateCurrentWinningStreak(resultsState.currentWinningStreak);
            if(resultsState.currentWinningStreak > resultsState.winsInARow) {
              resultsState.winsInARow += 1;
              dbCalls.updateWinsInARow(resultsState.currentWinningStreak);
            }
            dbCalls.updateUserCoins(newCoins);
            dbCalls.updateWins(resultsState.numberOfWins);
          } else {
            if(resultsState.ladderNumber < 9) {
              resultsState.ladderWin = true;
              dbCalls.updateLadder(resultsState.ladderNumber);
              resultsState.ladderNumber += 1;
            }
          }
          tie = false;
          // Run ad for every 20 games won
          if(resultsState.numberOfWins % 20 === 0) {
            ads.runAd(resultsState);
          }
        }
        if(userResult.highCard < computerResult[0].highCard) {
          console.log(`Computer wins the a straight flush to ${computerResult[0].highCard}`);
          resultsState.winningHand = computerResult[0].computerHand - 1;
          resultsState.currentWinningStreak = 0;
          dbCalls.updateCurrentWinningStreak(0);
          if(resultsState.ladder === false) {
            let newCoins = (resultsState.coins - resultsState.bet);
            resultsState.coins = newCoins;
            dbCalls.updateUserCoins(newCoins);
          }
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
      let handsAmount;
      if(resetState.ladder === true) {
        handsAmount = resetState.ladderNumber + 1;
      } else {
        handsAmount = resetState.handsDisplay.length;
      }
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
      resetState.winningHand = null;
      resetState.ladderWin = false;
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