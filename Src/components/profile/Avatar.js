import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Image, ImageBackground, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import store from '../../state/store';
import * as types from '../../state/actions/actions';
import * as dbCalls from '../../database/db';
import constants from '../../assets/Constants';

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Avatar extends Component {
  changeAvatar(avatar) {
    store.dispatch(types.updateAvatar(avatar));
    dbCalls.updateAvatar(avatar);
  }

  closeAvatar() {
    store.dispatch(types.openCloseAvatar());
  }
  
  changeAvatarBGColor(BGColor) {
    store.dispatch(types.changeAvatarBGColor(BGColor));
    dbCalls.updateAvatarBGColor(BGColor);

  }

  render() {
    console.log('props in avatar ', this.props)
    return(
      <ImageBackground style={styles.container} source={require('../../assets/profile/profile_background.png')}>
        <ScrollView>
          <View style={styles.xContainer}>
            <TouchableWithoutFeedback onPress={() => this.closeAvatar()}>
              <Image source={require('../../assets/settings_page/White_X.png')} />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.avatarContainer}>
            {this.props.settings.death ? 
              <TouchableWithoutFeedback onPress={() => this.changeAvatar('death')}>
                <Image style={styles.avatar} source={require('../../assets/profile/avatars/Avatar_Death.png')} />
              </TouchableWithoutFeedback> :
              <ImageBackground style={styles.lockedBackgroundImage} source={require('../../assets/profile/avatars/Avatar_Death.png')}>
                <Image style={styles.lock} source={require('../../assets/profile/avatars/Lock_Icon.png')} />
              </ImageBackground> 
            }
            {this.props.settings.clown ? 
              <TouchableWithoutFeedback onPress={() => this.changeAvatar('clown')}>
                <Image style={[styles.avatar, this.props.settings.avatar === 'clown' ? styles.selectedAvatar : null]} source={require('../../assets/profile/avatars/Avatar_Clown.png')} />
              </TouchableWithoutFeedback> :
              <ImageBackground style={styles.lockedBackgroundImage} source={require('../../assets/profile/avatars/Avatar_Clown.png')}>
                <Image style={styles.lock} source={require('../../assets/profile/avatars/Lock_Icon.png')} />
              </ImageBackground> 
            }
            {this.props.settings.cowboy ? 
              <TouchableWithoutFeedback onPress={() => this.changeAvatar('cowboy')}>
                <Image style={[styles.avatar, this.props.settings.avatar === 'cowboy' ? styles.selectedAvatar : null]} source={require('../../assets/profile/avatars/Avatar_Cowboy.png')} />
              </TouchableWithoutFeedback> :
              <ImageBackground style={styles.lockedBackgroundImage} source={require('../../assets/profile/avatars/Avatar_Cowboy.png')}>
                <Image style={styles.lock} source={require('../../assets/profile/avatars/Lock_Icon.png')} />
              </ImageBackground> 
            }
            {this.props.settings.jobStress ? 
              <TouchableWithoutFeedback onPress={() => this.changeAvatar('jobStress')}>
                <Image style={[styles.avatar, this.props.settings.avatar === 'jobStress' ? styles.selectedAvatar : null]} source={require('../../assets/profile/avatars/Avatar_Job_Stress.png')} />
              </TouchableWithoutFeedback> :
              <ImageBackground style={styles.lockedBackgroundImage} source={require('../../assets/profile/avatars/Avatar_Job_Stress.png')}>
                <Image style={styles.lock} source={require('../../assets/profile/avatars/Lock_Icon.png')} />
              </ImageBackground> 
            }
            {this.props.settings.lamb ? 
              <TouchableWithoutFeedback onPress={() => this.changeAvatar('lamb')}>
                <Image style={[styles.avatar, this.props.settings.avatar === 'lamb' ? styles.selectedAvatar : null]} source={require('../../assets/profile/avatars/Avatar_Lamb.png')} />
              </TouchableWithoutFeedback> :
              <ImageBackground style={styles.lockedBackgroundImage} source={require('../../assets/profile/avatars/Avatar_Lamb.png')}>
                <Image style={styles.lock} source={require('../../assets/profile/avatars/Lock_Icon.png')} />
              </ImageBackground> 
            }
            {this.props.settings.puppy ? 
              <TouchableWithoutFeedback onPress={() => this.changeAvatar('puppy')}>
                <Image style={[styles.avatar, , this.props.settings.avatar === 'puppy' ? styles.selectedAvatar : null]} source={require('../../assets/profile/avatars/Avatar_Puppy.png')} />
              </TouchableWithoutFeedback> :
              <ImageBackground style={styles.lockedBackgroundImage} source={require('../../assets/profile/avatars/Avatar_Puppy.png')}>
                <Image style={styles.lock} source={require('../../assets/profile/avatars/Lock_Icon.png')} />
              </ImageBackground> 
            }
            {this.props.settings.zombie ? 
              <TouchableWithoutFeedback onPress={() => this.changeAvatar('zombie')}>
                <Image style={[styles.avatar, this.props.settings.avatar === 'zombie' ? styles.selectedAvatar : null]} source={require('../../assets/profile/avatars/Avatar_Zombie_Boy.png')} />
              </TouchableWithoutFeedback> :
              <ImageBackground style={styles.lockedBackgroundImage} source={require('../../assets/profile/avatars/Avatar_Zombie_Boy.png')}>
                <Image style={styles.lock} source={require('../../assets/profile/avatars/Lock_Icon.png')} />
              </ImageBackground> 
            }
          </View>
          <View style={styles.headerContainer}><Text style={styles.header}>Colors</Text></View>
          <View style={styles.avatarContainer}>
            <TouchableWithoutFeedback onPress={() => this.changeAvatarBGColor('black')}>
              <Image style={[styles.avatar, this.props.settings.avatarBGColor === 'black' ? styles.selectedAvatar : null]} source={require('../../assets/profile/avatars/backgroundColors/Avatar_BG_Black.png')} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.changeAvatarBGColor('blue')}>
              <Image style={[styles.avatar, this.props.settings.avatarBGColor === 'blue' ? styles.selectedAvatar : null]} source={require('../../assets/profile/avatars/backgroundColors/Avatar_BG_Blue.png')} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.changeAvatarBGColor('green')}>
              <Image style={[styles.avatar, this.props.settings.avatarBGColor === 'green' ? styles.selectedAvatar : null]} source={require('../../assets/profile/avatars/backgroundColors/Avatar_BG_Green.png')} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.changeAvatarBGColor('orange')}>
              <Image style={[styles.avatar, this.props.settings.avatarBGColor === 'orange' ? styles.selectedAvatar : null]} source={require('../../assets/profile/avatars/backgroundColors/Avatar_BG_Orange.png')} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.changeAvatarBGColor('red')}>
              <Image style={[styles.avatar, this.props.settings.avatarBGColor === 'red' ? styles.selectedAvatar : null]} source={require('../../assets/profile/avatars/backgroundColors/Avatar_BG_Red.png')} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.changeAvatarBGColor('white')}>
              <Image style={[styles.avatar, this.props.settings.avatarBGColor === 'white' ? styles.selectedAvatar : null]} source={require('../../assets/profile/avatars/backgroundColors/Avatar_BG_White.png')} />
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    zIndex: 10,
    resizeMode: 'stretch',
    position: 'absolute',
  },
  xContainer: {
    alignItems: 'flex-end',
    paddingRight: 30,
    paddingTop: 20
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
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
  selectedAvatar: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50
  },
  
  lock: {
    width: 50,
    height: 50
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 20,
    color: 'white'
  }
})

export default connect(mapStateToProps)(Avatar)