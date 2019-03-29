import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, StyleSheet, TouchableHighlight, ImageBackground, Dimensions} from 'react-native';
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
      <ImageBackground style={styles.backgroundImage} source={require("../../assets/settings_page/Settings_BG.png")}>
        <View style={styles.backgroundImageTopBar}>
          <View style={styles.topBar}>
            <Text style={styles.header}>Total Number of Hands</Text>
            <TouchableHighlight onPress={() => this.closeTotalNumberOfHands()}><Image source={require("../../assets/settings_page/White_X.png")} /></TouchableHighlight>
          </View>
          <Num_Hands />
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: screenHeight / 2,
    width: screednWidth / 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 10,
    marginTop: 10,
    marginLeft: 50,
    paddingLeft: 20,
    paddingTop: 10
  },
  backgroundImageTopBar: {
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  header: {
    color: 'white',
    fontSize: 20
  },
  topBar: {
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 30
  }
})

export default connect(mapStateToProps)(Total_Number_Of_Hands);
