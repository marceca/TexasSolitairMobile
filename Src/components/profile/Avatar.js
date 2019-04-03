import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import store from '../../state/store';
import * as types from '../../state/actions/actions';
import constants from '../../assets/Constants';

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Avatar extends Component {
  changeAvatar(avatar) {
    store.dispatch(types.updateAvatar(avatar))
  }

  closeAvatar() {
    store.dispatch(types.openCloseAvatar())
  }

  render() {
    return(
      <View style={styles.container}>
        <View><TouchableWithoutFeedback onPress={() => this.closeAvatar()}><Image source={require('../../assets/settings_page/White_X.png')} /></TouchableWithoutFeedback></View>
        <TouchableWithoutFeedback onPress={() => this.changeAvatar('pony')}><Image source={require('../../assets/profile/avatars/Avatar_Checka.png')} /></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.changeAvatar('death-orange')}><Image source={require('../../assets/profile/avatars/Avatar_Death_In_A_Circle.png')} /></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.changeAvatar('death')}><Image source={require('../../assets/profile/avatars/Avatar_Death.png')} /></TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  text: {
    color: 'red',
    fontSize: 20
  }
})

export default connect(mapStateToProps)(Avatar)