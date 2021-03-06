import React, { Component } from 'react';
import {View, TouchableWithoutFeedback, Image, Text, StyleSheet, Dimensions, ImageBackground, TextInput, Platform} from 'react-native';
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
import LadderPrompt from './prompts/LadderPrompt';
import constants from '../assets/Constants';
import * as dbCalls from '../database/db';
import DismissKeyboard from './DismissKeyboard';
import User_Hand from './User_Hand';
import Profile from './Profile';
import The_Shop from './The_Shop';
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
    if(props.game.play === 1 && !props.game.dealt) {
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
    if(props.game.play === 5 && props.game.dealt) {
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
    store.dispatch(types.deal())
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

  chipsCommas(chips) {
    let commaChips = chips.toString().split('');
    let returnChips = ''
    for(let i = 0; i < commaChips.length; i++) {
      if(i % 3 === 0 && i != 0) {
        returnChips += ','
        returnChips += commaChips[commaChips.length - i - 1];
      } else {
        returnChips += commaChips[commaChips.length - i - 1];
      }
    }
    returnChips = returnChips.split('').reverse().join('')
    return returnChips;
  }

  render() {
    const bg = constants.backgroundPossibilities[this.props.settings.main_background_image]

    return (
      console.log('props ', this.props),
      <ImageBackground style={styles.mainBackgroundImage} source={bg}>
      {this.props.game.ladderWin ? <LottieView source={require('../assets/animations/Winning_Hand_Animation_Final.json')} style={styles.animation} autoPlay loop /> : null }
        <View style={styles.container}>
          <DismissKeyboard>
            <ImageBackground style={styles.tableBackgroundImage} source={require('../assets/tables/Poker_Table.png')}>
              {this.props.game.mainMenu ? <Main_Menu /> : null}
              <DismissKeyboard>
                <View style={styles.settingsContainer}>
                  <View style={styles.userDataContainer}>
                    <Profile_Image />
                    <View style={[styles.scoreContainter, styles.adjustTopIcons]}>
                      <Text style={styles.coinsText}>Chips: {this.props.game.coins ? this.chipsCommas(this.props.game.coins) : 0} </Text>
                    </View>
                  </View>
                  <View style={styles.topRightIcons}>
                    {this.props.game.ladderLives === 0 && this.props.game.ladder ? <TouchableWithoutFeedback><Image style={styles.heart} source={require('../assets/ladder_lives/No_Life_Left.png')} /></TouchableWithoutFeedback> : null}
                    {this.props.game.ladderLives === 1 && this.props.game.ladder ? <TouchableWithoutFeedback><Image style={styles.heart} source={require('../assets/ladder_lives/One_Life_Left.png')} /></TouchableWithoutFeedback> : null}
                    {this.props.game.ladderLives === 2 && this.props.game.ladder ? <TouchableWithoutFeedback><Image style={styles.heart} source={require('../assets/ladder_lives/Two_Lives_Left.png')} /></TouchableWithoutFeedback> : null}
                    {this.props.game.ladderLives === 3 && this.props.game.ladder ? <TouchableWithoutFeedback><Image style={styles.heart} source={require('../assets/ladder_lives/Three_Lives_Left.png')} /></TouchableWithoutFeedback> : null}
                    <TouchableWithoutFeedback onPress={() => this.openCloseSettings()}>
                      <Image style={[styles.settingsIcon, styles.adjustTopIcons]} source={require('../assets/main_menu/Settings_Icon.png')} />
                    </TouchableWithoutFeedback>
                  </View>
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
              {this.props.settings.openCloseShop ? <The_Shop /> : null}
              {this.props.settings.leader_boards ? <LeaderBoard /> : null }
              {this.props.game.ladderPrompt ? <LadderPrompt /> : null}
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
                    {this.props.game.switch && this.props.game.dealt === true ? <TouchableWithoutFeedback onPress={(e) => this.switch(e,this.props)}><Image style={styles.stickSwitchButtons} source={require('../assets/buttons/Switch_Button_White_2.png')} /></TouchableWithoutFeedback> : null}
                    {!this.props.game.dealt ? null : <TouchableWithoutFeedback id="game-button" onPress={(e) => this.deal(e,this.props)} ><Image style={[styles.stickSwitchButtons, styles.cantClickButton]} source={require('../assets/buttons/Stick_Button_White_2.png')} /></TouchableWithoutFeedback>}
                    {this.props.game.dealt === false && this.props.game.reset === false ? <TouchableWithoutFeedback id="game-button" onPress={(e) => this.deal(e,this.props)} ><Image style={styles.stickSwitchButtons} source={require('../assets/buttons/deal_button.png')} /></TouchableWithoutFeedback> : null }
                    {this.props.game.reset ? <TouchableWithoutFeedback onPress={(e) => this.reset()}><Image style={styles.stickSwitchButtons} source={require('../assets/buttons/Next_Hand_White_2.png')} /></TouchableWithoutFeedback> : null}
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
  animation: {
    zIndex: 1,
    height: screenHeight / 1,
    position: 'absolute',
    left: '0%',
    top: '0%',
    bottom: '0%'
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
    width: '95%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15
  },
  userDataContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: screenWidth / 2.5
  },
  topRightIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: screenWidth / 2
  },
  adjustTopIcons: {
    marginLeft: 10
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
    width: 40,
    height: 40,
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
    flexDirection: 'row',
    paddingLeft: 50,
  },
  stickSwitchButtons: {
    height: 75,
    width: 150,
    zIndex: 11
  },
  cantClickButton: {
    
  },
  heart: {
    width: 50,
    height: 40,
    alignItems: 'flex-end'
  }
})



export default connect(mapStateToProps)(Game);
