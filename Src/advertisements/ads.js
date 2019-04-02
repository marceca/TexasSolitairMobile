import firebase from 'react-native-firebase';
import * as dbCalls from '../database/db';

async function runAd(state) {
  const advert = firebase.admob().rewarded('ca-app-pub-3940256099942544/1712485313');
  const AdRequest = firebase.admob.AdRequest;
  const request = new AdRequest();
  request.addKeyword('foo').addKeyword('bar');
  advert.loadAd(request.build());
  advert.on('onAdLoaded', () => {
    console.log('Advert ready to show.');
    advert.show();
  });
  
  await advert.on('onRewarded', (event) => {
    state.coins = state.coins + 1000;
    console.log('The user watched the entire video and will now be rewarded!', event);
    dbCalls.updateUserCoins(state.coins);
  });
}

module.exports = {
  runAd
}