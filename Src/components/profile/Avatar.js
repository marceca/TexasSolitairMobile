import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, ImageBackground, TouchableWithoutFeedback, StyleSheet} from 'react-native';
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
        <View style={styles.xContainer}>
          <TouchableWithoutFeedback onPress={() => this.closeAvatar()}>
            <Image source={require('../../assets/settings_page/White_X.png')} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.avatarContainer}>
          {this.props.settings.pony ? 
            <TouchableWithoutFeedback onPress={() => this.changeAvatar('pony')}>
              <Image style={styles.avatar} source={require('../../assets/profile/avatars/Avatar_Checka.png')} />
            </TouchableWithoutFeedback> :
            <ImageBackground style={styles.lockedBackgroundImage} source={require('../../assets/profile/avatars/Avatar_Checka.png')}>
              <Image style={styles.lock} source={require('../../assets/profile/avatars/Lock_Icon.png')} />
            </ImageBackground> 
          }
          {this.props.settings.deathOrange ? 
            <TouchableWithoutFeedback onPress={() => this.changeAvatar('death-orange')}>
              <Image style={styles.avatar} source={require('../../assets/profile/avatars/Avatar_Death_In_A_Circle.png')} />
            </TouchableWithoutFeedback> :
            <ImageBackground style={styles.lockedBackgroundImage} source={require('../../assets/profile/avatars/Avatar_Death_In_A_Circle.png')}>
              <Image style={styles.lock} source={require('../../assets/profile/avatars/Lock_Icon.png')} />
            </ImageBackground> 
          }
          {this.props.settings.death ? 
            <TouchableWithoutFeedback onPress={() => this.changeAvatar('death')}>
              <Image style={styles.avatar} source={require('../../assets/profile/avatars/Avatar_Death.png')} />
            </TouchableWithoutFeedback> :
            <ImageBackground style={styles.lockedBackgroundImage} source={require('../../assets/profile/avatars/Avatar_Death.png')}>
              <Image style={styles.lock} source={require('../../assets/profile/avatars/Lock_Icon.png')} />
            </ImageBackground> 
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    padding: 20
  },
  xContainer: {
    alignItems: 'flex-end'
  },
  avatarContainer: {
    flexDirection: 'row',
  },
  lockedBackgroundImage: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  avatar: {
    width: 100,
    height: 100,
    margin: 10
  },
  lock: {
    width: 50,
    height: 50
  }
})

export default connect(mapStateToProps)(Avatar)