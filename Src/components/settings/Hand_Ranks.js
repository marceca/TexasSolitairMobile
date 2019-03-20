import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ScrollView, Image, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Hand_Ranks extends Component {
  render() {
    return (
      <ScrollView style={styles.backgroundContainer}>
          <TouchableHighlight><Image source={require("../../assets/settings_page/Hand_Ranks_Page.png")} /></TouchableHighlight>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    height: screenHeight,
    zIndex: 11,
    marginLeft: 50,
    position: 'absolute',
    right: screenWidth / 2.5,
    top: 0
  },
  xOut: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 20,
    width: 20
  }
})

export default connect(mapStateToProps)(Hand_Ranks)