import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';
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
      store.dispatch(types.userHand(id))
    }
  }
  test() {
    console.log('test')
  }
  render() {
    let mainGame = []
    for(let i = 0; i < this.props.game.handObjects.length - 1; i++) {
      mainGame.push(<TouchableHighlight key={'handNumber'+i} style={styles.possibleHand} onPress={(e) => this.changeHands(i, this.props)}><View style={styles.possibleHand} className="possible-hand" >{this.props.game.handsDisplay[i]}</View></TouchableHighlight>)
    }
    return (
      <View style={styles.possibleHandContainer} className="possible-hands-container">{mainGame}</View>
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