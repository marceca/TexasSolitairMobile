import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Dimensions, ImageBackground, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import store from '../state/store';
import * as types from '../state/actions/actions';
import Num_Hands from './settings/Num_Hands';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings,
    user: state.user
  }
}

class Main_Menu extends Component {
  start_game() {
    store.dispatch(types.startGame())
  }

  number_of_hands() {
    store.dispatch(types.numberOfHands())
  }

  render() {
    return (
      <View style={styles.blackModal}>
        <ImageBackground style={styles.mainMenu} source={require('../assets/main_menu/Menu_Screen.png')}>
          <View style={styles.topMenu}>
            <View style={styles.playerContainer}>
              <Image source={require("../assets/main_menu/Profile_Picture_Holder.png")} />
              <Text style={styles.playerName}>{this.props.user.name ? this.props.user.name : 'Dead Eyes'}</Text>
            </View>
            <Image source={require("../assets/main_menu/Profile_Picture_Holder.png")} />
          </View>
          <View style={styles.midMainMenu}>
            {this.props.settings.num_hands ? <Num_Hands /> : <TouchableHighlight onPress={() => this.start_game()}><Image source={require("../assets/main_menu/Play_Button.png")} /></TouchableHighlight>}
          </View>
          <View style={styles.bottomMainMenu}>
            <Image style={styles.bottomMainMenuImages} source={require("../assets/main_menu/Play_Button.png")} />
            <TouchableHighlight onPress={() => this.number_of_hands()}><Image style={styles.bottomMainMenuImages} source={require("../assets/settings_page/Test_72ppi_Super.png")} /></TouchableHighlight>
            <Image style={styles.bottomMainMenuImages} source={require("../assets/main_menu/Play_Button.png")} />
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  blackModal: {
    width: screenWidth,
    backgroundColor: 'black'
  },
  mainMenu: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  topMenu: {
    width: screenWidth,
    justifyContent: 'space-between',
    height: screenHeight / 8,
    flexDirection: 'row',
  },
  playerContainer: {
    justifyContent: 'space-between',
    width: screenWidth / 4,
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10
  },
  playerName: {
    color: 'white',
    justifyContent: 'flex-end',
    fontSize: 20
  },
  midMainMenu: {
    height: screenHeight / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20
  },
  bottomMainMenu: {
    height: screenHeight / 4,
    width: screenWidth,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  bottomMainMenuImages: {
    width: screenWidth / 3,
    flex: 1
  }
})

export default connect(mapStateToProps)(Main_Menu);