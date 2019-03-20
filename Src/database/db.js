import firebase from 'react-native-firebase';
import DeviceInfo from 'react-native-device-info';
import * as types from '../state/actions/actions';
import store from '../state/store';

const uniqueID = DeviceInfo.getUniqueID();

var config = {
  databaseURL: "https://fir-database-f7da2.firebaseio.com/",
  projectId: "fir-database-f7da2",
}

firebase.initializeApp(config);

function writeUserData(coins,uniqueID,fname ,lname){
  firebase.database().ref('Users/' + uniqueID + '/').set({
      coins,
      fname,
      lname
  })
}

function readUserData(user) {
  firebase.database().ref('Users/' + user +'/').once('value', function (snapshot) {
    if(snapshot.val() === null) {
      console.log('in null')
      writeUserData(1000, uniqueID, 'firstName', 'lastName');
    } else { 
      console.log('found record and gets user information')
      console.log('snap shot ',snapshot.val())
      store.dispatch(types.updateUserName(snapshot.val().fname))
    }
  });
}

module.exports = {
  writeUserData,
  readUserData,
  uniqueID
}