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

class Stick_Switch_Hands extends Component {
  changeHands(id, props) {
    console.log('change hands')
    if(props.game.choseHandThisTurn === false) {
      console.log('in change hands')
      store.dispatch(types.userHand(id))
      if(props.game.play === 1) {
        store.dispatch(types.deal())
      }
      if(props.game.play === 2 && props.game.chosenHand != false) {
        store.dispatch(types.flop());
      }
      if(props.game.play === 3) {
        store.dispatch(types.turn());
      }
      if(props.game.play === 4) {
        store.dispatch(types.river());
      }
      if(props.game.play === 5) {
        store.dispatch(types.results());
      }
    }
  }
  test() {
    console.log('test')
  }
  render() {
    let mainGame = []
    for(let i = 0; i < this.props.game.handObjects.length - 1; i++) {
      mainGame.push(<TouchableWithoutFeedback key={'handNumber'+i} style={styles.possibleHand} onPress={(e) => this.changeHands(i, this.props)}><View style={styles.possibleHand}>{this.props.game.handsDisplay[i]}</View></TouchableWithoutFeedback>)
    }
    return (
      <View style={styles.possibleHandContainer}>{mainGame}</View>
    )
  }
}

const styles = StyleSheet.create({
  possibleHandContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth / 2,
    height: screenHeight / 10,
    flexDirection: 'row',
  },
  possibleHand: {
    width: 100,
    height: 75,
    zIndex: 11,
    padding: 5,
    flexDirection: 'row',
  }
})

export default connect(mapStateToProps)(Stick_Switch_Hands);