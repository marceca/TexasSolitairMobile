import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ImageBackground, TouchableWithoutFeedback, Image, StyleSheet} from 'react-native';
import constants from '../../assets/Constants';
import store from '../../state/store';
import * as types from '../../state/actions/actions';

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Profile_Image extends Component {
  openCloseProfile() {
    store.dispatch(types.openCloseProfile());
  }
  
  render() {
    const avatar  = constants.avatars[this.props.settings.avatar];
    const avatarBGColor = constants.avatarBackgroundColors[this.props.settings.avatarBGColor];
    return (
      <ImageBackground style={styles.settingsIcon} source={require("../../assets/main_menu/Profile_Pic_Pill.png")}><ImageBackground style={[styles.settingsIcon, styles.avatar]} source={avatarBGColor}><TouchableWithoutFeedback onPress={() => this.openCloseProfile()}><Image style={[styles.settingsIcon, styles.avatar]} source={avatar} /></TouchableWithoutFeedback></ImageBackground></ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  settingsIcon: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    height: 49,
    width: 49
  }
})

export default connect(mapStateToProps)(Profile_Image);