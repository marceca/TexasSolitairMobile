import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import store from '../state/store';
import * as types from '../state/actions/actions';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class User_Hand extends Component {
  render() {
    return (
      <View style={[styles.playerHand, this.props.game.winningHand === this.props.game.handsDisplay.length - 1 ? styles.winningHand : '']}>{this.props.game.handsDisplay[this.props.game.handsDisplay.length - 1]}</View>
    )
  }
}

const styles = StyleSheet.create({
  playerHand: {
    width: 120,
    height: 90,
    padding: 10,
    flexDirection: 'row'
  },
  winningHand: {
    width: 200,
    height: 150
  }
})

export default connect(mapStateToProps)(User_Hand);