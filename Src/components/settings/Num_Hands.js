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
  update_num_hands(numberOfHands, numHandsImage) {
    store.dispatch(types.updateNumberOfHands(numberOfHands, numHandsImage))
  }
  
  render() {
    return (
      <View style={styles.numHandsContainer} className="num-hands-container">
        <TouchableHighlight onPress={() => this.update_num_hands(2, 'two')}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_2.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(3, 'three')}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_3.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(4, 'four')}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_4.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(5, 'five')}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_5.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(6, 'six')}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_6.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(7, 'seven')}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_7.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(8, 'eight')}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_8.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(9, 'nine')}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_9.png")} /></TouchableHighlight>
        <TouchableHighlight onPress={() => this.update_num_hands(10, 'ten')}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_10.png")} /></TouchableHighlight>
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