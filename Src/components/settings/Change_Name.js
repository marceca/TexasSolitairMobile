import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import store from '../../state/store';
import * as types from '../../state/actions/actions';
import dbCalls from '../../database/db';

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Change_Name extends Component {
  constructor(props) {
    super(props);
    this.state = {newName: 'Enter new name'}
  }

  updateName() {
    dbCalls.updateName(this.state.newName);
    dbCalls.readUserData(dbCalls.uniqueID);    
  }
  render() {
    return (
      <View style={styles.changeNameContainer}>
        <TextInput style={styles.textBox} clearTextOnFocus={true} onChangeText={(newName) => this.setState({newName})} value={this.state.newName} />
        <Button onPress={() => this.updateName()} title='Update Name' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  changeNameContainer: {
    flexDirection: 'row'
  },
  textBox: {
    width: 200, 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    color: 'red'
  }
})

export default connect(mapStateToProps)(Change_Name);