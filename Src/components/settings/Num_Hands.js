import React, {Component} from 'react';
import {View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native'
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
      <View style={styles.numHandsContainer}>
        <TouchableWithoutFeedback onPress={() => this.update_num_hands(2, 'two')}><View style={styles.numberContainer}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_2.png")} /></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.update_num_hands(3, 'three')}><View style={styles.numberContainer}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_3.png")} /></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.update_num_hands(4, 'four')}><View style={styles.numberContainer}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_4.png")} /></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.update_num_hands(5, 'five')}><View style={styles.numberContainer}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_5.png")} /></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.update_num_hands(6, 'six')}><View style={styles.numberContainer}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_6.png")} /></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.update_num_hands(7, 'seven')}><View style={styles.numberContainer}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_7.png")} /></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.update_num_hands(8, 'eight')}><View style={styles.numberContainer}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_8.png")} /></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.update_num_hands(9, 'nine')}><View style={styles.numberContainer}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_9.png")} /></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.update_num_hands(10, 'ten')}><View style={styles.numberContainer}><Image style={styles.numbers} source={require("../../assets/main_menu/individual_numbers/Number_10_Redo.png")} /></View></TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  numHandsContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
    height: '50%',
    margin: 'auto',
    paddingLeft: 18,
    paddingTop: 5,
    marginRight: 0,
    marginLeft: 0,
    backgroundColor: 'white',
    borderRadius: 65,
    flexDirection: 'row',
  },
  numberContainer: {
    height: screenHeight / 8,
    width: screenHeight / 8
  },
  numbers: {
    height: 50,
    width: 25
  }
})

export default connect(mapStateToProps)(Num_Hands);