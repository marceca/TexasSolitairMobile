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

function writeUserData(coins,uniqueID,fname ,lname, ladderNumber, numberOfWins){
  firebase.database().ref('Users/' + uniqueID + '/').set({
      coins,
      fname,
      lname,
      ladderNumber,
      numberOfWins
  })
}

function readUserData(user) {
  firebase.database().ref('Users/' + user +'/').once('value', function (snapshot) {
    if(snapshot.val() === null) {
      writeUserData(1000, uniqueID, 'firstName', 'lastName', 1, 0);
    } else { 
      console.log('snap shot ',snapshot.val());
      store.dispatch(types.updateUser(snapshot.val().fname, snapshot.val().coins, snapshot.val().ladderNumber, snapshot.val().numberOfWins));
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
    fname: newName
  })
}

function updateWins(currentWins) {
  const newWins = currentWins + 1;
  firebase.database().ref('Users/' + uniqueID + '/').update({
    numberOfWins: newWins
  })
}

// function getUserScore() {
//   firebase.database().ref('Users/' + user + '/')
// }

module.exports = {
  writeUserData,
  readUserData,
  uniqueID,
  updateUserCoins,
  updateLadder,
  updateName,
  updateWins
}