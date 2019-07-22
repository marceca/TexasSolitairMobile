import React, { Component } from 'react';
import {View, Text, Image, TouchableWithoutFeedback, StyleSheet, Dimensions, ImageBackground, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import store from '../../state/store';
import * as types from '../../state/actions/actions';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Background_Image_Selection extends Component {
  backgroundImageClose() {
    store.dispatch(types.backgroundImageClose())
  }

  updateBackgroundImage(backgroundImage) {
    store.dispatch(types.updateBackgroundImage(backgroundImage))
  }

  render() {
    return(
      <ScrollView style={styles.backgroundContainer}>
        <ImageBackground style={styles.imageContainer} source={require("../../assets/settings_page/Settings_BG.png")}>
          <View style={styles.backgroundImageTopBar}>
            <Text style={styles.settingsText}>Backgrounds</Text>
            <TouchableWithoutFeedback onPress={() => this.backgroundImageClose()}><Image source={require("../../assets/settings_page/White_X.png")} /></TouchableWithoutFeedback>
          </View>
          <View style={styles.images}>
            <TouchableWithoutFeedback onPress={() => this.updateBackgroundImage('wood')}><Image  style={styles.backgroundImage} source={require("../../assets/backgrounds/brown_design_hardwood.jpg")} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.updateBackgroundImage('dark_stone')}><Image  style={styles.backgroundImage} source={require("../../assets/backgrounds/Dark_Stone.jpg")} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.updateBackgroundImage('dogs')}><Image  style={styles.backgroundImage} source={require("../../assets/backgrounds/Dogs_Playing_Poker.jpg")} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.updateBackgroundImage('light_rays')}><Image  style={styles.backgroundImage} source={require("../../assets/backgrounds/Light_Rays.png")} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.updateBackgroundImage('ocean')}><Image  style={styles.backgroundImage} source={require("../../assets/backgrounds/Ocean.jpg")} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.updateBackgroundImage('peadceful_lake')}><Image  style={styles.backgroundImage} source={require("../../assets/backgrounds/Peaceful_Lake.jpg")} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.updateBackgroundImage('abstract_painting')}><Image  style={styles.backgroundImage} source={require("../../assets/backgrounds/Abstract_Painting.jpg")} /></TouchableWithoutFeedback>
          </View>
        </ImageBackground>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    height: screenHeight,
    zIndex: 11,
    position: 'absolute',
    top: 0
  },
  imageContainer: {
    height: screenHeight,
    width: 350,
    zIndex: 11,
    marginLeft: 50,
    justifyContent: 'center',
  },
  backgroundImageTopBar: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  settingsText: {
    color: 'white',
    fontSize: 20
  },
  backgroundImage: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 5
  },
  images: {
    alignItems: 'center'
  }
})

export default connect(mapStateToProps)(Background_Image_Selection);