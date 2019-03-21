import React, {Component} from 'react';
import {View, Image, StyleSheet, Dimensions, TouchableHighlight} from 'react-native'
import {connect} from 'react-redux';
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

class Num_Hands extends Component {
  update_num_hands(numberOfHands) {
    store.dispatch(types.updateNumberOfHands(numberOfHands))
  }
  
  render() {
    return (
      <View style={styles.numHandsContainer} className="num-hands-container">
        <TouchableHighlight onPress={() => this.update_num_hands(2)}><Image style={styles.numbers} source={require("../../assets/settings_page/Number_1_Button.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(3)}><Image style={styles.numbers} source={require("../../assets/settings_page/Number_2_Button.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(4)}><Image style={styles.numbers} source={require("../../assets/settings_page/Number_3_Button.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(5)}><Image style={styles.numbers} source={require("../../assets/settings_page/Number_4_Button.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(6)}><Image style={styles.numbers} source={require("../../assets/settings_page/Number_5_Button.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(7)}><Image style={styles.numbers} source={require("../../assets/settings_page/Number_6_Button.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(8)}><Image style={styles.numbers} source={require("../../assets/settings_page/Number_7_Button.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(9)}><Image style={styles.numbers} source={require("../../assets/settings_page/Number_8_Button.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(10)}><Image style={styles.numbers} source={require("../../assets/settings_page/Number_9_Button.png")} /></TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  numHandsContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '95%',
    height: '50%',
    margin: 'auto',
    marginRight: 0,
    marginLeft: 0,
    backgroundColor: 'white',
    borderRadius: 65,
    flexDirection: 'row',
  },
  numbers: {
    height: screenHeight / 8,
    width: 20
  }
})

export default connect(mapStateToProps)(Num_Hands);