import React, { Component } from 'react';
import {View, TouchableWithoutFeedback, Image, Text, StyleSheet, Dimensions, ImageBackground, TextInput} from 'react-native';
import { connect } from 'react-redux';
import store from '../state/store';
import * as types from '../state/actions/actions';
import Background_Image_Selection from './settings/Background_Image_Selection';
import Change_Card_Back from './settings/Change_Card_back';
import Total_Number_Of_Hands from './settings/Total_Number_Of_Hands';
import Hand_Ranks from './settings/Hand_Ranks';
import Tutorial from './settings/Tutorial';
import Main_Menu from './Main_Menu';
import Settings from './Settings';
import Stick_Switch_Hands from'./Stick_Switch_Hands';
import LeaderBoard from './pages/LeaderBoards';
import constants from '../assets/Constants';
import * as dbCalls from '../database/db';
import DismissKeyboard from './DismissKeyboard';
import User_Hand from './User_Hand';
import Profile from './Profile';
import Profile_Image from './profile/Profile_Image';
import LottieView from 'lottie-react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}
class Game extends Component {

  componentDidMount() {
    // let score = db.getUserScore()
    console.log('here ', dbCalls.readUserData(dbCalls.uniqueID));
  }

  deal(el, props) {
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

  switch() {
    store.dispatch(types.allowSwitch())
  }

  openCloseSettings() {
    store.dispatch(types.settings())
  }
  
  playerCardOne() {
    if(this.props.game.userHand.length > 0) {
      return this.props.game.handsDisplay[this.props.game.chosenHand - 1][0]
    }
  }

  playerCardTwo() {
    if(this.props.game.userHand.length > 0) {
      return this.props.game.handsDisplay[this.props.game.chosenHand - 1][1]      
    }
  }

  reset() {
    store.dispatch(types.reset())
  }

  incrementBet() {
    store.dispatch(types.increaseBet())
  }

  decreaseBet() {
    store.dispatch(types.decreaseBet())
  }

  updateTextInput(num) {
    if(this.props.game.coins >= num) {
      store.dispatch(types.updateBet(num))
    }
  }

  openCloseLeaderBoards() {
    store.dispatch(types.openCloseLeaderBoards())
  }
  
  render() {
    const bg = constants.backgroundPossibilities[this.props.settings.main_background_image]
    return (
      console.log('props ', this.props),
      <ImageBackground style={styles.mainBackgroundImage} source={bg}>
      {this.props.game.ladderWin ? <LottieView source={require('../assets/animations/Confetti_Animation_Test.json')} style={styles.test} autoPlay loop /> : null }
        <View style={styles.container}>
          <DismissKeyboard>
            <ImageBackground style={styles.tableBackgroundImage} source={require('../assets/tables/Poker_Table.png')}>
              {this.props.settings.mainMenu ? <Main_Menu /> : null}
              <DismissKeyboard>
                <View style={styles.settingsContainer}>
                  <View style={styles.userDataContainer}>
                    <Profile_Image />
                    <View style={styles.scoreContainter}><Text style={styles.coinsText}>Coins: {this.props.game.coins ? this.props.game.coins : 0} </Text></View>
                  </View>
                  <TouchableWithoutFeedback onPress={() => this.openCloseLeaderBoards()}>
                    <Image style={styles.settingsIcon}  source={require('../assets/leader_boards/First_Place_Trophy.png')} />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.openCloseSettings()}>
                    <Image style={styles.settingsIcon} source={require('../assets/icons/settings.png')} />
                  </TouchableWithoutFeedback>
                </View>
              </DismissKeyboard>
              {/* Setting Pages */}
              {this.props.settings.tutorial ? <Tutorial /> : null}
              {this.props.settings.hand_ranks ? <Hand_Ranks /> : null}
              {this.props.settings.background_image ? <Background_Image_Selection /> : null}
              {this.props.settings.total_hands ? <Total_Number_Of_Hands /> : null}
              {this.props.settings.change_card_back ? <Change_Card_Back /> : null}
              {this.props.settings.settings ? <Settings /> : null}
              {this.props.game.profile ? <Profile /> : null}
              {this.props.settings.leader_boards ? <LeaderBoard /> : null }
              <DismissKeyboard>
                <View style={styles.cardsContainer}>
                  <View style={styles.playerHandsContainer}>
                    <Stick_Switch_Hands />
                  </View>
                  <View style={styles.communityCardsContainer}>
                    {this.props.game.communityCards}
                  </View>
                  <View style={styles.bettigsButtonsContainer}>
                    <TouchableWithoutFeedback onPress={() => this.incrementBet()}><Image style={styles.bettingButtons} source={require('../assets/betting/Bet_Arrow_Up.png')} /></TouchableWithoutFeedback>
                    <TextInput style={styles.betInput} onChangeText={(num) => this.updateTextInput(num)} type='number' value={this.props.game.bet.toString()} keyboardType ='numeric' />
                    <TouchableWithoutFeedback onPress={() => this.decreaseBet()}><Image style={styles.bettingButtons} source={require('../assets/betting/Bet_Arrow_Down.png')} /></TouchableWithoutFeedback>
                  </View>
                </View>
              </DismissKeyboard>
              <DismissKeyboard>
                <View style={styles.buttonsContainer}>
                  <View Style={styles.userCards}>
                    <User_Hand />
                  </View>
                  <View style={styles.stickSwitchButtonsContainer}>
                    {this.props.game.stick ? <TouchableWithoutFeedback id="game-button" onPress={(e) => this.deal(e,this.props)} ><Image style={styles.stickSwitchButtons} source={require('../assets/buttons/Stick_Button_White_2.png')} /></TouchableWithoutFeedback> : <Image style={[styles.stickSwitchButtons, styles.cantClickButton]} source={require('../assets/buttons/Stick_Button_White_2.png')} />}
                    {this.props.game.switch ? <TouchableWithoutFeedback onPress={(e) => this.switch(e,this.props)}><Image style={styles.stickSwitchButtons} source={require('../assets/buttons/Switch_Button_White_2.png')} /></TouchableWithoutFeedback> : <Image style={[styles.stickSwitchButtons, styles.cantClickButton]} source={require('../assets/buttons/Switch_Button_White_2.png')} />}
                    {this.props.game.reset ? <TouchableWithoutFeedback onPress={(e) => this.reset(e)}><Image style={styles.stickSwitchButtons} source={require('../assets/buttons/Next_Hand_White_2.png')} /></TouchableWithoutFeedback> : <Image style={[styles.stickSwitchButtons, styles.cantClickButton]} source={require('../assets/buttons/Next_Hand_White_2.png')} />}
                  </View>
                </View>
              </DismissKeyboard>
            </ImageBackground>
          </DismissKeyboard>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    zIndex: 1,
    height: screenHeight / 1.5,
    position: 'absolute',
    left: '20%'
  },
  container: {
    width: screenWidth,
    height: screenHeight,
  },
  mainBackgroundImage: {
    width: screenWidth,
    height: screenHeight,
  },
  tableBackgroundImage: {
    width: screenWidth,
    height: screenHeight,
    resizeMode: 'center',
    justifyContent: 'space-between'
  },
  settingsContainer: {
    width: '90%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10
  },
  userDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth / 5
  },
  scoreContainter: {
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 25
  },
  coinsText: {
    fontSize: 16,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  settingsIcon: {
    width: 30,
    height: 30,
    alignItems: 'flex-end'
  },
  cardsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: screenWidth,
    height: screenHeight / 2
  },
  playerHandsContainer: {
    flexDirection: 'column',
    width: screenWidth / 2,
  },
  communityCardsContainer: {
    flexDirection: 'row',
    width: screenWidth / 3,
  },
  bettigsButtonsContainer: {
    flexDirection: 'column',
    width:  '10%',
    top: '5%'
  },
  bettingButtons: {
      width: '65%',
      height: 50,
      resizeMode: 'stretch'
  },
  buttonsContainer: {
    width: screenWidth,
    height: screenHeight / 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  betInput: {
    backgroundColor: 'white',
    width: '65%',
    color: 'black'
  },
  userCards: {
    justifyContent: 'flex-end',
    width: screenWidth / 2
  },
  stickSwitchButtonsContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  stickSwitchButtons: {
    height: 75,
    width: 150,
    zIndex: 11
  },
  cantClickButton: {
    opacity: 0.3
  }
})



export default connect(mapStateToProps)(Game);
