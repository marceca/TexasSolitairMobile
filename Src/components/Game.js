import React, { Component } from 'react';
import {View, TouchableHighlight, Image, Text, StyleSheet, Dimensions, ImageBackground} from 'react-native';
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
import constants from '../assets/Constants';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}
class Game extends Component {

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
  render() {
    const bg = constants.backgroundPossibilities[this.props.settings.main_background_image]
    return (
      console.log('props ', this.props),
      <ImageBackground style={styles.mainBackgroundImage} source={bg}>
        <View style={styles.container} className="background-image-container">
          <ImageBackground style={styles.tableBackgroundImage} source={require('../assets/tables/Poker_Table.png')}>
            {this.props.settings.mainMenu ? <Main_Menu /> : null}
            <View style={styles.imageContainer} className="settings-icon">
              <TouchableHighlight onPress={() => this.openCloseSettings()}>
                <Image style={styles.settingsIcon} source={require('../assets/icons/settings.png')} />
              </TouchableHighlight>
            </View>
            {/* Setting Pages */}
            {this.props.settings.tutorial ? <Tutorial /> : null}
            {this.props.settings.hand_ranks ? <Hand_Ranks /> : null}
            {this.props.settings.background_image ? <Background_Image_Selection /> : null}
            {this.props.settings.total_hands ? <Total_Number_Of_Hands /> : null}
            {this.props.settings.change_card_back ? <Change_Card_Back /> : null}
            { this.props.settings.settings ? <Settings /> : null}
            <View style={styles.cardsContainer} className="cards-container">
              <View style={styles.playerHandsContainer} className="player-hands-container">
                <Stick_Switch_Hands />
              </View>
              <View style={styles.communityCardsContainer} className="community-cards">
                {this.props.game.communityCards}
              </View>
            </View>
            <View style={styles.buttonsContainer} className="buttons-container">
              <View Style={styles.userCards}className="user-cards">
                <View style={styles.playeHand} className="possible-hand">
                  {this.props.game.handsDisplay[this.props.game.handsDisplay.length - 1]}
                </View>
              </View>
              <View style={styles.stickSwitchButtonsContainer} className="stick-switch-buttons">
                <TouchableHighlight className="button stick" id="game-button" onPress={(e) => this.deal(e,this.props)} ><Image style={styles.stickSwitchButtons} source={require('../assets/buttons/Stick_Button_White_2.png')} /></TouchableHighlight>
                <TouchableHighlight className="button switch" onPress={(e) => this.switch(e,this.props)}><Image style={styles.stickSwitchButtons} source={require('../assets/buttons/Switch_Button_White_2.png')} /></TouchableHighlight>
                {this.props.game.reset ? <TouchableHighlight onPress={(e) => this.reset(e)}><Image style={styles.stickSwitchButtons} source={require('../assets/buttons/Next_Hand_White_2.png')} /></TouchableHighlight> : <Image style={[styles.stickSwitchButtons, styles.cantClickButton]} source={require('../assets/buttons/Next_Hand_White_2.png')} />}
              </View>
            </View>
          </ImageBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
  },
  mainBackgroundImage: {
    width: screenWidth,
    height: screenHeight
  },
  tableBackgroundImage: {
    width: screenWidth,
    height: screenHeight,
    resizeMode: 'center',
    justifyContent: 'space-between'
  },
  imageContainer: {
    width: screenWidth,
    height: 20,
    alignItems: 'flex-end'
  },
  settingsIcon: {
    width: 30,
    height: 30,
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
    width: screenWidth / 2,
  },
  buttonsContainer: {
    width: screenWidth,
    height: screenHeight / 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  userCards: {
    justifyContent: 'flex-end',
    width: screenWidth / 2
  },
  playeHand: {
    width: 120,
    height: 90,
    padding: 10,
    flexDirection: 'row'
  },
  stickSwitchButtonsContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  stickSwitchButtons: {
    height: 75,
    width: 150
  },
  cantClickButton: {
    opacity: 0.3
  }
})



export default connect(mapStateToProps)(Game);
