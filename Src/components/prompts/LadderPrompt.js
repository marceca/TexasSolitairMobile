import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Image, ImageBackground, Text, TouchableWithoutFeedback, StyleSheet, Dimensions} from 'react-native';
import store from '../../state/store';
import * as types from '../../state/actions/actions';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = (state) => {
  return {
    game: state.application
  }
}

class LadderPrompt extends Component {
  closePrompt() {
    store.dispatch(types.closeLadderPrompt())
  }

  spendTicket() {
    store.dispatch(types.spendLadderTicket())
    store.dispatch(types.startGame());
  }

  render() {
    return (
      <View style={styles.view}>
        <ImageBackground style={styles.mainImage} source={require('../../assets/prompts/Wooden_Pill.png')}>
          <Text style={styles.text}>Would you like to spend a ticket on Ladder?</Text>
          <View style={styles.buttonContainer}>
            <TouchableWithoutFeedback onPress={() => this.closePrompt()}><Image style={[styles.button, styles.buttonNo]} source={require('../../assets/prompts/No_Button.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.spendTicket()}><Image style={[styles.button, styles.buttonYes]} source={require('../../assets/prompts/Yes_Button.png')} /></TouchableWithoutFeedback>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    right: '25%',
    top: '25%'
  },
  mainImage: {
    height: screenHeight / 2,
    width: screenWidth / 2,
    zIndex: 10,
    flexDirection: 'column',
    justifyContent:'space-between'
  },
  text: {
    textAlign: 'center',
    marginTop: '8%',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: '10%',
    marginRight: '10%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    marginBottom: '1%'
  },
  buttonYes: {
    marginRight: '10%'
  },
  buttonNo: {
    marginLeft: '10%'
  }
})

export default connect(mapStateToProps)(LadderPrompt);