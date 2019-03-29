import React, { Component } from 'react';
import {View, Text, Image, TouchableHighlight, StyleSheet, Dimensions, ImageBackground, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import store from '../../state/store';
import * as types from '../../state/actions/actions';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Change_Card_Back extends Component {

  cardBackClose() {
    store.dispatch(types.closeCardBack());
  }

  changeCardBack(cardBack) {
    store.dispatch(types.changeCardBack(cardBack))
  }
  render() {
    return (
      <ScrollView style={styles.backgroundContainer}>
        <ImageBackground style={{width: screenWidth / 2.5, height: screenHeight/1.1}}  source={require("../../assets/settings_page/Settings_BG.png")}>
          <View style={styles.backgroundImageTopBar}>
            <Text style={styles.settingsText}>Change Card Back</Text>
            <TouchableHighlight onPress={() => this.cardBackClose()}><Image source={require("../../assets/settings_page/White_X.png")} /></TouchableHighlight>
          </View>
          <View className="flex-column">
            <View style={styles.twoImageContainer} className="flex-row padding-top-10px">
              <TouchableHighlight onPress={(e) => this.changeCardBack('blue')}><Image style={styles.images} source={require("../../assets/settings_page/Blue_Card_Back.png")} /></TouchableHighlight>
              <TouchableHighlight onPress={(e) => this.changeCardBack('red')}><Image style={styles.images} source={require("../../assets/settings_page/Red_Card_Back.png")} /></TouchableHighlight>
            </View>
            <View style={styles.twoImageContainer} className="flex-row">
              <TouchableHighlight onPress={(e) => this.changeCardBack('deadly')}><Image style={styles.images} source={require("../../assets/settings_page/Deadly_Woman_Card_Back.png")} /></TouchableHighlight>
              <TouchableHighlight onPress={(e) => this.changeCardBack('logo')}><Image style={styles.images} source={require("../../assets/settings_page/Logo_Card_Back.png")} /></TouchableHighlight>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    height: screenHeight,
    zIndex: 11,
    marginLeft: 50,
    marginTop: 20,
    position: 'absolute'
  },
  backgroundImageTopBar: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 30
  },
  settingsText: {
    color: 'white',
    fontSize: 20
  },
  images: {
    height: 120,
    width: 90
  },
  twoImageContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    height: 140
  }
})

export default connect(mapStateToProps)(Change_Card_Back);