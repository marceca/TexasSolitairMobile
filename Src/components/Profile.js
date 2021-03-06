import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TouchableWithoutFeedback, Image, Text, ImageBackground, StyleSheet, Dimensions, ScrollView} from 'react-native';
import * as types from '../state/actions/actions';
import store from '../state/store';
import Change_Name from './settings/Change_Name';
import Avatar from './profile/Avatar';
import Profile_Image from './profile/Profile_Image';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Profile extends Component {
  changeName() {
    store.dispatch(types.openChangeName())
  }

  openCloseAvatar() {
    store.dispatch(types.openCloseAvatar())
  }

  openCloseProfile() {
    store.dispatch(types.openCloseProfile());
  }

  render() {
    return (
      <ImageBackground style={styles.image} source={require('../assets/profile/profile_background.png')}>
        {this.props.settings.openCloseAvatar ? <Avatar /> : null}
        <ScrollView>
          <View style={styles.topMenu}>
            <View style={styles.playerContainer}>
            <TouchableWithoutFeedback onPress={() => this.openCloseAvatar()}><Image style={styles.changeAvatar} source={require('../assets/profile/Change_Avatar_Button.png')} /></TouchableWithoutFeedback>
              <Profile_Image />
              <Text style={styles.playerName}>{this.props.game.name ? this.props.game.name : 'Dead Eyes'}</Text>
              <TouchableWithoutFeedback onPress={() => this.changeName()}><Image style={styles.changeName} source={require('../assets/profile/Change_Name_Profile_Page_Button.png')} /></TouchableWithoutFeedback>
              {this.props.settings.changeName ? <Change_Name /> : null}
            </View>
            <View><TouchableWithoutFeedback onPress={() => this.openCloseProfile()}><Image source={require("../assets/settings_page/White_X.png")} /></TouchableWithoutFeedback></View>
          </View>
          <Image style={styles.blueLineFullWidth} source={require('../assets/profile/Horizontal_Blue_Line.png')} />
          <View style={styles.headers}><Image source={require('../assets/profile/Stats_Header.png')} /></View>
          <View style={styles.statsContainer}>
            <View style={styles.individualStats}>
              <Text style={styles.statsText}>Current Chips: </Text>
              <Text style={styles.statsText}>{this.props.game.coins}</Text>
            </View>
            <Image style={styles.blueLineShort} source={require('../assets/profile/Horizontal_Blue_Line.png')} />
            <View style={styles.individualStats}>
              <Text style={styles.statsText}>Current Tickets: </Text>
              <Text style={styles.statsText}>{this.props.game.tickets}</Text>
            </View>
            <Image style={styles.blueLineShort} source={require('../assets/profile/Horizontal_Blue_Line.png')} />
            <View style={styles.individualStats}>
              <Text style={styles.statsText}>Hands Played: </Text>
              <Text style={styles.statsText}>{this.props.game.handsPlayed}</Text>
            </View>
            <Image style={styles.blueLineShort} source={require('../assets/profile/Horizontal_Blue_Line.png')} />
            <View style={styles.individualStats}>
              <Text style={styles.statsText}>Number of Wins: </Text>
              <Text style={styles.statsText}>{this.props.game.numberOfWins}</Text>
            </View>
            <Image style={styles.blueLineShort} source={require('../assets/profile/Horizontal_Blue_Line.png')} />
            <View style={styles.individualStats}>
              <Text style={styles.statsText}>Current Winning Streak: </Text>
              <Text style={styles.statsText}>{this.props.game.currentWinningStreak}</Text>
            </View>
            <Image style={styles.blueLineShort} source={require('../assets/profile/Horizontal_Blue_Line.png')} />
            <View style={styles.individualStats}>
              <Text style={styles.statsText}>Most Wins in a Row: </Text>
              <Text style={styles.statsText}>{this.props.game.winsInARow}</Text>
            </View>
            <Image style={styles.blueLineShort} source={require('../assets/profile/Horizontal_Blue_Line.png')} />
          </View>
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
    paddingLeft: 20,
    marginRight: 10
  },
  settingsIcon:  {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    height: 49,
    width: 49
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
    width: 20,
    position: 'absolute',
    left: 60,
    top: 4
  },
  changeAvatar: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 30,
    left: 5,
    zIndex: 10
  },
  blueLineFullWidth: {
    width: '100%',
    paddingTop: 40
  },
  blueLineShort: {
    width: '90%'
  },
  headers: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
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