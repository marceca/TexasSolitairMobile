import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import { Provider } from 'react-redux';
import store from './Src/state/store';
import Game from './Src/components/Game';
import * as dbCalls from './Src/database/db';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});

    dbCalls.readUserData(dbCalls.uniqueID);
  }

  render() {
    return (
      <Provider store={store}><View style={styles.container}><Game /></View></Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    maxWidth: screenWidth,
    maxHeight: screenHeight,
    height: screenHeight,
    width: screenWidth
  }
});