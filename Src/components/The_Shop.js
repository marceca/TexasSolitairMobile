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

class TheShop extends Component {
  changeName() {
    store.dispatch(types.openChangeName())
  }

  openCloseAvatar() {
    store.dispatch(types.openCloseAvatar())
  }

  openCloseShop() {
    console.log('open close')
    store.dispatch(types.openCloseShop());
  }

  render() {
    return (
      <ImageBackground style={styles.image} source={require('../assets/profile/profile_background.png')}>
        {this.props.settings.openCloseAvatar ? <Avatar /> : null}
        <View style={styles.mainContainer}>
          <View style={styles.xButton}>
            <TouchableWithoutFeedback onPress={() => this.openCloseShop()}><Image source={require("../assets/settings_page/White_X.png")} /></TouchableWithoutFeedback>
          </View>
          <View style={styles.row}>
            <View style={styles.buyingOptionsContainer}>
              <View style={styles.buyingOptionsRowContainer}>
                <View style={styles.choiceContainer}><Image style={styles.option} source={require('../assets/the_shop/chips_small_stack.png')} /></View>
                <View style={styles.choiceContainer}><Image style={styles.option} source={require('../assets/the_shop/chips_average_stack.png')} /></View>
                <View style={styles.choiceContainer}><Image style={styles.option} source={require('../assets/the_shop/chips_big_stack.png')} /></View>
              </View>
              <View style={styles.buyingOptionsRowContainer}>
                <View style={styles.choiceContainer}><Image style={styles.option} source={require('../assets/the_shop/tickets_small_stack.png')} /></View>
                <View style={styles.choiceContainer}><Image style={styles.option} source={require('../assets/the_shop/tickets_average_stack.png')} /></View>
                <View style={styles.choiceContainer}><Image style={styles.option} source={require('../assets/the_shop/tickets_big_stack.png')} /></View>
              </View>
            </View>
            <View style={styles.bundleOptionContainer}>
              <Image style={styles.option} source={require('../assets/the_shop/bundle.png')} />
            </View>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    zIndex: 10,
    resizeMode: 'stretch',
    position: 'absolute',
  },
  mainContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column'
  },
  xButton: {
    position: 'absolute',
    right: 0,
    zIndex: 99
  },
  buyingOptionsContainer: {
    justifyContent: 'space-between',
    height: '90%',
    width: '40%'
  },
  buyingOptionsRowContainer: {
    width: '100%',
    height: '50%',
    flexDirection: 'row'
  },
  bundleOptionContainer: {
    height: '90%',
    width: '40%',
    marginRight: '10%'
  },
  choiceContainer: {
    width: '30%',
    height: '100%'
  },
  option: {
    flex: 1,
    resizeMode: 'contain'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default connect(mapStateToProps)(TheShop)