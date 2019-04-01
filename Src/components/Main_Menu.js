import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Dimensions, ImageBackground, TouchableWithoutFeedback, Platform} from 'react-native';
import {connect} from 'react-redux';
import store from '../state/store';
import * as types from '../state/actions/actions';
import Num_Hands from './settings/Num_Hands';
import constants from '../assets/Constants';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Main_Menu extends Component {
  start_game() {
    store.dispatch(types.startGame())
  }

  number_of_hands() {
    store.dispatch(types.numberOfHands())
  }

  showHideCards() {
    store.dispatch(types.showHideCards())
  }

  ladderState() {
    store.dispatch(types.ladder())
  }

  openCloseSettings() {
    store.dispatch(types.settings())
  }

  render() {
    const numHands = constants.numberOfHands[this.props.game.numOfHands]
    return (
      <View style={styles.blackModal}>
        <ImageBackground style={styles.mainMenu} source={require('../assets/main_menu/Menu_Screen.png')}>
          <View style={styles.topMenu}>
            <View style={styles.playerContainer}>
              <Image style={styles.settingsIcon} source={require("../assets/main_menu/Profile_Pic_Pill.png")} />
              <Text style={styles.playerName}>{this.props.game.name ? this.props.game.name : 'Dead Eyes'}</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => this.openCloseSettings()}><Image style={styles.settingsIcon} source={require("../assets/main_menu/Settings_Icon.png")} /></TouchableWithoutFeedback>
          </View>
          <View style={styles.midMainMenu}>
            {this.props.settings.num_hands ? <Num_Hands /> : <TouchableWithoutFeedback onPress={() => this.start_game()}><Image style={styles.midMainImage} source={require("../assets/main_menu/Play_Button.png")} /></TouchableWithoutFeedback>}
          </View>
          <View style={styles.bottomMainMenu}>
            <TouchableWithoutFeedback onPress={() => this.showHideCards()}>{this.props.game.showCards ? <Image style={styles.bottomMainMenuImages} source={require("../assets/main_menu/Show_Cards_Button.png")} /> : <Image style={styles.bottomMainMenuImages} source={require("../assets/main_menu/Hide_Cards_Button.png")} />}</TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.number_of_hands()}><Image style={styles.bottomMainMenuImages} source={numHands} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.ladderState()}>{this.props.game.ladder ? <Image style={styles.bottomMainMenuImages} source={require("../assets/main_menu/Ladder_Button.png")} /> : <Image style={styles.bottomMainMenuImages} source={require("../assets/main_menu/Ladder_Locked_Button.png")} />}</TouchableWithoutFeedback>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  blackModal: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'black'
  },
  mainMenu: {
    flexDirection: 'column',
    resizeMode: 'stretch',
    width: screenWidth,
    height: screenHeight
  },
  topMenu: {
    width: screenWidth,
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        height: screenHeight / 8
      },
      android: {
        height: screenHeight / 4,

      }
    }),
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
  playerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: screenWidth / 2,
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10
  },
  playerName: {
    color: 'white',
    justifyContent: 'flex-end',
    fontSize: 20,
    paddingLeft: 20
  },
  midMainMenu: {
    ...Platform.select({
      ios: {
        height: screenHeight / 1.32,
      },
      android: {
        height: screenHeight / 2,
      }
    }),
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  midMainImage: {

  },
  bottomMainMenu: {
    ...Platform.select({
      ios: {
        height: screenHeight / 8
      },
      android: {
        height: screenHeight / 4,

      }
    }),
    width: screenWidth,
    justifyContent: 'space-between',
    flexDirection: 'row',
    resizeMode: 'contain',
    paddingLeft: 10,
    paddingRight: 10
  },
  bottomMainMenuImages: {
    width: screenWidth / 3.8,
    resizeMode: 'contain',
    flex: 1
  },
  settingsIcon:  {
    height: 50,
    width: 50
  }
})

export default connect(mapStateToProps)(Main_Menu);