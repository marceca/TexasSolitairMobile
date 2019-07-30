import firebase from 'react-native-firebase';
import DeviceInfo from 'react-native-device-info';
import * as types from '../state/actions/actions';
import store from '../state/store';

const uniqueID = DeviceInfo.getUniqueID();

var config = {
  databaseURL: "https://stickorswitch-a103e.firebaseio.com/",
  projectId: "fir-database-f7da2",
}

firebase.initializeApp(config);

function writeUserData(coins, tickets, uniqueID, nickName, avatar, avatarBGColor, ladderNumber, handsPlayed, numberOfWins, currentWinningsStreak, winsInARow, ladderLives){
  firebase.database().ref('Users/' + uniqueID + '/').set({
      coins,
      tickets,
      nickName,
      avatar,
      avatarBGColor,
      ladderNumber,
      handsPlayed,
      numberOfWins,
      currentWinningsStreak,
      winsInARow,
      ladderLives
  })
}

function readUserData(user) {
  firebase.database().ref('Users/' + user +'/').once('value', function (snapshot) {
    if(snapshot.val() === null) {
      writeUserData(1000, 5, uniqueID, 'firstName', 'puppy', 'red', 1, 0, 0, 0, 0, 0);
      store.dispatch(types.updateUser(1000, 5, 'firstName', 'puppy', 'red', 1, 0, 0, 0, 0, 0))
    } else { 
      console.log('snap shot ',snapshot.val());
      store.dispatch(types.updateUser(snapshot.val().coins, snapshot.val().tickets, snapshot.val().nickName, snapshot.val().ladderNumber, snapshot.val().ladderLives, snapshot.val().currentLadderWinning, snapshot.val().handsPlayed, snapshot.val().numberOfWins, snapshot.val().currentWinningsStreak, snapshot.val().winsInARow));
      store.dispatch(types.updateSettings(snapshot.val().avatar, snapshot.val().avatarBGColor))
    }
  });
}

function updateUserCoins(newCoins) {
  firebase.database().ref('Users/' + uniqueID + '/').update({
    coins: newCoins
  })
}

function updateLadder(currentLadder) {
  const nextLadder = currentLadder + 1;
  if(nextLadder < 10) {
    firebase.database().ref('Users/' + uniqueID + '/').update({
      ladderNumber: nextLadder
    })
  }
}

function updateName(newName) {
  firebase.database().ref('Users/' + uniqueID + '/').update({
    nickName: newName
  })
}

function updateHandsPlayed(newHandsPlayed) {
  firebase.database().ref('Users/' + uniqueID + '/').update({
    handsPlayed: newHandsPlayed
  })
}

function updateWins(currentWins) {
  const newWins = currentWins + 1;
  firebase.database().ref('Users/' + uniqueID + '/').update({
    numberOfWins: newWins
  })
}

function updateCurrentWinningStreak(newCurrentWinningStreak) {
  firebase.database().ref('Users/' + uniqueID + '/').update({
    currentWinningsStreak: newCurrentWinningStreak
  })
}

function updateWinsInARow(newWinningStreak) {
  firebase.database().ref('Users/' + uniqueID + '/').update({
    winsInARow: newWinningStreak
  })
}

function getAllInformation() {
  firebase.database().ref('Users/').once('value', function (snapshot) {
    console.log('get all information ', snapshot._value)
    store.dispatch(types.updateLeaderBoardStats(snapshot._value))
  });
}

function ladderUseTicket(newTicketValue) {
  firebase.database().ref('Users/' + uniqueID + '/').update({
    tickets: newTicketValue,
    ladderLives: 3
  })
}

function loseLife(newLifeTotal) {
  firebase.database().ref('Users/' + uniqueID + '/').update({
    ladderLives: newLifeTotal
  })
}

function loseLadder(coinWinnings) {
  firebase.database().ref('Users/' + uniqueID + '/').update({
    ladderLives: 0,
    ladderNumber: 1,
    coins: coinWinnings,
    currentLadderWinning: 0
  })
}

function updateAvatar(newAvatar) {
  firebase.database().ref('Users/' + uniqueID + '/').update({
    avatar: newAvatar
  })
}

function updateAvatarBGColor(newAvatarBGColor) {
  firebase.database().ref('Users/' + uniqueID + '/').update({
    avatarBGColor: newAvatarBGColor
  })
}

function currentLadderWinning(newLadderWinnings) {
  firebase.database().ref('Users/' + uniqueID + '/').update({
    currentLadderWinning: newLadderWinnings
  })
}

module.exports = {
  writeUserData,
  readUserData,
  uniqueID,
  updateUserCoins,
  updateLadder,
  updateName,
  updateHandsPlayed,
  updateWins,
  updateCurrentWinningStreak,
  updateWinsInARow,
  getAllInformation,
  ladderUseTicket,
  loseLife,
  loseLadder,
  updateAvatar,
  updateAvatarBGColor,
  currentLadderWinning
}