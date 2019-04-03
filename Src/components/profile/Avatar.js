import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import store from '../../state/store';
import * as types from '../../state/actions/actions';
import constants from '../../assets/Constants';

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Avatar extends Component {
  render() {
    return(
      <View style={styles.container}><Text style={styles.text}>View</Text></View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  text: {
    color: 'red',
    fontSize: 20
  }
})

export default connect(mapStateToProps)(Avatar)