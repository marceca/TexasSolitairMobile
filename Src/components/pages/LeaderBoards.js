import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../state/store';
import {View, ImageBackground, Image, Text, StyleSheet, Dimensions} from 'react-native';
import * as types from '../../state/actions/actions';
import * as dbCalls from '../../database/db';
import { white } from 'ansi-colors';

const {height, width} = Dimensions.get('window')

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class LeaderBoards extends Component {
  componentDidMount() {
    dbCalls.getAllInformation();
  }
  render() {
    console.log('props in leader boareds', this.props)
    const stats = [];
    for(let i = 0; i < this.props.settings.leader_board_stats.length; i++) {
      stats.push(
        <View key={this.props.settings.leader_board_stats[i][0]} style={styles.statsContainer}>
          <Text style={styles.stats}>
            {this.props.settings.leader_board_stats[i][0]}
          </Text>
          <Text style={styles.stats}>
            {this.props.settings.leader_board_stats[i][1]}
          </Text>
          <Text style={[styles.stats, styles.alignLeft]}>
            {this.props.settings.leader_board_stats[i][2]}
          </Text>
        </View>
      )
    }
    return (
      <ImageBackground style={styles.container} source={require('../../assets/leader_boards/Leaderboard_BG.png')}>
      <View style={styles.mainHeaderContainer}>
        <Image source={require('../../assets/leader_boards/Leaderboard_Header.png')} />
      </View>
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/leader_boards/Hands_Won_Button.png')} />
        <Image source={require('../../assets/leader_boards/Chips_Button.png')} />
        <Image source={require('../../assets/leader_boards/Ladder_Wins_Button.png')} />
      </View>
      <View>
        {stats}
      </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    zIndex: 10
  },
  mainHeaderContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  statsContainer: {
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20
  },
  stats: {
    color: 'white',
    fontSize: 20,
    alignItems: 'center'
  },
  alignLeft: {
    alignItems: 'flex-start'
  }
})

export default connect(mapStateToProps)(LeaderBoards);