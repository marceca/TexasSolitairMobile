import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TouchableWithoutFeedback, Image, Text, ImageBackground, StyleSheet, Dimensions, ScrollView} from 'react-native';
import * as types from '../state/actions/actions';
import store from '../state/store';
import Change_Name from './settings/Change_Name';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Profile extends Component {
  openCloseProfile() {
    store.dispatch(types.openCloseProfile());
  }

  changeName() {
    store.dispatch(types.openChangeName())
  }

  render() {
    return (
      <ImageBackground style={styles.image} source={require('../assets/profile/profile_background.png')}>
        <ScrollView>
          <View style={styles.topMenu}>
            <View style={styles.playerContainer}>
              <TouchableWithoutFeedback onPress={() => this.openCloseProfile()}><Image style={styles.settingsIcon} source={require("../assets/main_menu/Profile_Pic_Pill.png")} /></TouchableWithoutFeedback>
              <Text style={styles.playerName}>{this.props.game.name ? this.props.game.name : 'Dead Eyes'}</Text>
              <TouchableWithoutFeedback onPress={() => this.changeName()}><Image style={styles.changeName} source={require('../assets/profile/Change_Name_Profile_Page_Button.png')} /></TouchableWithoutFeedback>
              {this.props.settings.changeName ? <Change_Name /> : null}
            </View>
          </View>
          <Image style={styles.blueLineFullWidth} source={require('../assets/profile/Horizontal_Blue_Line.png')} />
          <View style={styles.headers}><Image source={require('../assets/profile/Stats_Header.png')} /></View>
          <View style={styles.statsContainer}>
            <View style={styles.individualStats}>
              <Text style={styles.statsText}>Number of Wins: </Text>
              <Text style={styles.statsText}>{this.props.game.numberOfWins}</Text>
            </View>
            <Image style={styles.blueLineShort} source={require('../assets/profile/Horizontal_Blue_Line.png')} />
          </View>
          <Image style={styles.blueLineFullWidth} source={require('../assets/profile/Horizontal_Blue_Line.png')} />
          <View style={styles.headers}><Image source={require('../assets/profile/Challenges_Header.png')} /></View>
        </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  topMenu: {
    width: screenWidth,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: screenHeight / 6,
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
  settingsIcon:  {
    height: 50,
    width: 50
  },
  image: {
    height: '100%',
    width: '100%',
    zIndex: 10,
    resizeMode: 'stretch',
    position: 'absolute',
  },
  changeName: {
    height: 20,
    width: 20
  },
  blueLineFullWidth: {
    width: '100%'
  },
  blueLineShort: {
    width: '90%'
  },
  headers: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  individualStats: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%'
  },
  statsText: {
    color: 'white',
    fontSize: 20
  }
})

export default connect(mapStateToProps)(Profile)