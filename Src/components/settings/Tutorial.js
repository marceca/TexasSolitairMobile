import React, {Component} from 'react';
import {View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import store from '../../state/store';
import * as types from '../../state/actions/actions';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = (state) => {
  return{
    game: state.application,
    settings: state.settings
  }
}

class Tutorial extends Component {
  next_page() {
    store.dispatch(types.tutorialPage())

  }
  render() {
    return(
      <View onPress={() => this.next_page()} style={styles.modal}>
        {this.props.settings.tutorial_page === 1 ? <TouchableWithoutFeedback style={styles.imageTouchableWithoutFeedback} onPress={() => this.next_page()}><Image style={styles.image} source={require("../../assets/tutorial/Tutorial_Page_1.png")} /></TouchableWithoutFeedback> : null}
        {this.props.settings.tutorial_page === 2 ? <TouchableWithoutFeedback style={styles.imageTouchableWithoutFeedback} onPress={() => this.next_page()}><Image  style={styles.image} source={require("../../assets/tutorial/Tutorial_Page_2.png")} /></TouchableWithoutFeedback> : null}
        {this.props.settings.tutorial_page === 3 ? <TouchableWithoutFeedback style={styles.imageTouchableWithoutFeedback} onPress={() => this.next_page()}><Image  style={styles.image} source={require("../../assets/tutorial/Tutorial_Page_3.png")} /></TouchableWithoutFeedback> : null}
        {this.props.settings.tutorial_page === 4 ? <TouchableWithoutFeedback style={styles.imageTouchableWithoutFeedback} onPress={() => this.next_page()}><Image  style={styles.image} source={require("../../assets/tutorial/Tutorial_Page_4.png")} /></TouchableWithoutFeedback> : null}
        {this.props.settings.tutorial_page === 5 ? <TouchableWithoutFeedback style={styles.imageTouchableWithoutFeedback} onPress={() => this.next_page()}><Image  style={styles.image} source={require("../../assets/tutorial/Tutorial_Page_5.png")} /></TouchableWithoutFeedback> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    width: screenWidth,
    height: screenHeight,
    zIndex: 11,
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0
  },
  imageTouchableWithoutFeedback: {
    zIndex: 12,
    flex: 1
  },
  image: {
    flex: 1,
    zIndex: 12,
    resizeMode: 'contain',
    height: undefined,
    width: undefined
  }
})

export default connect(mapStateToProps)(Tutorial)