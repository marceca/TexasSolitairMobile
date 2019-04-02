import firebase from 'react-native-firebase';

const advert = firebase.admob().rewarded('ca-app-pub-3940256099942544/1712485313');
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foo').addKeyword('bar');
advert.loadAd(request.build());
advert.on('onAdLoaded', () => {
  console.log('Advert ready to show.');
  advert.show();
});

advert.on('onRewarded', (event) => {
  console.log('The user watched the entire video and will now be rewarded!', event);
});