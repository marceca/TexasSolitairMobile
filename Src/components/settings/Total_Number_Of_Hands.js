import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback, ImageBackground, Dimensions, ScrollView} from 'react-native';
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
      <ScrollView style={styles.backgroundContainer}>
        <ImageBackground style={styles.backgroundImage} source={require("../../assets/settings_page/Settings_BG.png")}>
          <View style={styles.topBar}>
            <Text style={styles.header}>Total Number of Hands</Text>
            <TouchableWithoutFeedback onPress={() => this.closeTotalNumberOfHands()}><Image source={require("../../assets/settings_page/White_X.png")} /></TouchableWithoutFeedback>
          </View>
          <Num_Hands />
        </ImageBackground>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    width: screednWidth / 2,
    zIndex: 11,
    marginLeft: 50,
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 30
  },
  backgroundContainer: {
    height: screenHeight,
    zIndex: 11,
    position: 'absolute',
    top: '40%'
  },
  header: {
    color: 'white',
    fontSize: 20
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10
  }
})

export default connect(mapStateToProps)(Total_Number_Of_Hands);
