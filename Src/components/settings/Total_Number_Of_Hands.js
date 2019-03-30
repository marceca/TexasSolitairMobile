import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, StyleSheet, TouchableHighlight, ImageBackground, Dimensions, ScrollView} from 'react-native';
import * as types from '../../state/actions/actions';
import store from '../../state/store';
import Num_Hands from './Num_Hands';

const screednWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Total_Number_Of_Hands extends Component {
  closeTotalNumberOfHands() {
    store.dispatch(types.closeTotalNumberOfHands());
  }

  render() {
    return(
      <ScrollView style={styles.backgroundImageTopBar}>
        <ImageBackground style={styles.backgroundImage} source={require("../../assets/settings_page/Settings_BG.png")}>
          <View style={styles.topBar}>
            <Text style={styles.header}>Total Number of Hands</Text>
            <TouchableHighlight onPress={() => this.closeTotalNumberOfHands()}><Image source={require("../../assets/settings_page/White_X.png")} /></TouchableHighlight>
          </View>
          <Num_Hands />
        </ImageBackground>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: screenHeight / 1.5,
    width: screednWidth / 2,
    zIndex: 11,
    marginLeft: 50,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
  },
  backgroundImageTopBar: {
    height: screenHeight,
    zIndex: 11,
    position: 'absolute',
    top: 0
  },
  header: {
    color: 'white',
    fontSize: 20
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export default connect(mapStateToProps)(Total_Number_Of_Hands);
