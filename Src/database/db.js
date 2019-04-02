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

function writeUserData(coins,uniqueID,nickName, ladderNumber, handsPlayed, numberOfWins, currentWinningsStreak, winsInARow){
  firebase.database().ref('Users/' + uniqueID + '/').set({
      coins,
      nickName,
      ladderNumber,
      handsPlayed,
      numberOfWins,
      currentWinningsStreak,
      winsInARow
  })
}

function readUserData(user) {
  firebase.database().ref('Users/' + user +'/').once('value', function (snapshot) {
    if(snapshot.val() === null) {
      writeUserData(1000, uniqueID, 'firstName', 1, 0, 0, 0, 0);
    } else { 
      console.log('snap shot ',snapshot.val());
      store.dispatch(types.updateUser(snapshot.val().nickName, snapshot.val().coins, snapshot.val().ladderNumber, snapshot.val().handsPlayed, snapshot.val().numberOfWins, snapshot.val().currentWinningsStreak, snapshot.val().winsInARow));
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
  updateWinsInARow
}