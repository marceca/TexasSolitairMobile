import React, { Component } from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, Dimensions, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { connect } from 'react-redux';
import store from '../state/store';
import * as types from '../state/actions/actions';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = (state) => {
  return {
    game: state.application
  }
}

class Settings extends Component {
  closeSettings() {
    store.dispatch(types.closeSettings());
  }

  change_background_image() {
    store.dispatch(types.changeBackgroundImage());
  }

  open_card_back() {
    store.dispatch(types.openCardBack());
  }

  open_total_number_of_hands() {
    store.dispatch(types.openTotalNumberOfHands());
  }

  open_hand_ranks() {
    store.dispatch(types.openHandRanks());
  }

  open_tutorial() {
    store.dispatch(types.openTutorial());
  }

  show_main_menu() {
    store.dispatch(types.showMainMenu());
  }

  showCards() {
    store.dispatch(types.showHideCards());
  }

  onOffSFX() {
    store.dispatch(types.onOffSFX());
  }
  render() {
    return (
      <ImageBackground style={styles.settingsContainer} source={require('../assets/settings_page/Settings_BG.png')}>
        <ScrollView>
          <View style={styles.settingsIcons}><Text style={styles.settingsText}>Settings</Text><TouchableWithoutFeedback onPress={() => this.closeSettings()}><Image source={require("../assets/settings_page/White_X.png")} /></TouchableWithoutFeedback></View>
          <TouchableWithoutFeedback onPress={() => this.onOffSFX()}><View style={styles.settingsIcons}><Text style={styles.settingsText}>SFX</Text>{this.props.game.sfx ? <Image source={require("../assets/settings_page/On_Toggle.png")} /> : <Image source={require("../assets/settings_page/Off_Toggle.png")} />}</View></TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.showCards()}><View style={styles.settingsIcons}><Text style={styles.settingsText}>Show Cards</Text>{this.props.game.showCards ? <Image source={require("../assets/settings_page/On_Toggle.png")} /> : <Image source={require("../assets/settings_page/Off_Toggle.png")} />}</View></TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.open_total_number_of_hands()}><View style={styles.settingsIcons}><Text style={styles.settingsText}>Number of Hands</Text><Image source={require("../assets/settings_page/Blue_Arrow_Button.png")} /></View></TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.change_background_image()}><View style={styles.settingsIcons}><Text style={styles.settingsText}>Change Background</Text><Image source={require("../assets/settings_page/Blue_Arrow_Button.png")} /></View></TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.open_card_back()}><View style={styles.settingsIcons}><Text style={styles.settingsText}>Change Card Backs</Text><Image source={require("../assets/settings_page/Blue_Arrow_Button.png")} /></View></TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.open_hand_ranks()}><View style={styles.settingsIcons}><Text style={styles.settingsText}>Hand Ranks</Text><Image source={require("../assets/settings_page/Blue_Arrow_Button.png")} /></View></TouchableWithoutFeedback>
          <TouchableWithoutFeedback><View style={styles.settingsIcons}><Text style={styles.settingsText}>Contact Us</Text><Image source={require("../assets/settings_page/Blue_Arrow_Button.png")} /></View></TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.open_tutorial()}><View style={styles.settingsIcons}><Text style={styles.settingsText}>Tutorial</Text><Image source={require("../assets/settings_page/Blue_Arrow_Button.png")} /></View></TouchableWithoutFeedback>
          <TouchableWithoutFeedback><View style={styles.settingsIcons}><Text style={styles.settingsText}>Website</Text><Image source={require("../assets/settings_page/Blue_Arrow_Button.png")} /></View></TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.show_main_menu()}><View style={styles.settingsIcons}><Text style={styles.settingsText}>Menu Screen</Text><Image source={require("../assets/settings_page/Blue_Arrow_Button.png")} /></View></TouchableWithoutFeedback>
        </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  settingsContainer: {
    height: screenHeight,
    width: screenWidth / 2.5,
    zIndex: 10,
    position: 'absolute',
    top: 0,
    right: 20
  },
  settingsIcons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingTop: 3,
    paddingLeft: 15,
    paddingRight: 15
  },
  settingsText: {
    color: 'white',
    fontSize: 20
  }
})

export default connect(mapStateToProps)(Settings)