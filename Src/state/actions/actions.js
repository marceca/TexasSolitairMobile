// Game updates
const DEAL = 'DEAL';
const FLOP = 'FLOP';
const TURN = 'TURN';
const RIVER = 'RIVER';
const USERHAND = 'USERHAND';
const RESULTS = 'RESULTS';
const RESET = 'RESET';
const ALLOWSWITCH = 'ALLOWSWITCH';
const SETTINGS = 'SETTINGS';
const CLOSESETTINGS = 'CLOSESETTINGS';
const CHANGEBACKGROUNDIMAGE = 'CHANGEBACKGROUNDIMAGE';
const BACKGROUNDIMAGECLOSE = 'BACKGROUNDIMAGECLOSE';
const OPENCARDBACK = 'OPENCARDBACK';
const CLOSECARDBACK = 'CLOSECARDBACK';
const CHANGECARDBACK = 'CHANGECARDBACK';
const OPENTOTALNUMBEROFHANDS = 'OPENTOTALNUMBEROFHANDS';
const CLOSETOTALNUMBEROFHANDS =  'CLOSETOTALNUMBEROFHANDS';
const OPENHANDRANKS = 'OPENHANDRANKSOPEN';
const OPENTUTORIAL = 'OPENTUTORIAL';
const TUTORIALPAGE = 'TUTORIALPAGE';
const STARTGAME = 'STARTGAME';
const SHOWMAINMENU = 'SHOWMAINMENU';
const NUMBEROFHANDS = 'NUMBEROFHANDS';
const UPDATENUMBEROFHANDS = 'UPDATENUMBEROFHANDS';
const UPDATEBACKGROUNDIMAGE = 'UPDATEBACKGROUNDIMAGE';
const UPDATEBET = 'UPDATEBET';
const INCREASEBET = 'INCREASEBET';
const DECREASEBET = 'DECREASEBET';
const LADDER = 'LADDER';
const SHOWHIDECARDS = 'SHOWHIDECARDS';
const ONOFFSFX = 'ONOFFSFX';
const OPENCLOSEPROFILE = 'OPENCLOSEPROFILE';
const OPENCHANGENAME = 'OPENCHANGENAME';

const deal = () => ({type: DEAL});
const flop = () => ({type: FLOP});
const turn = () => ({type: TURN});
const river = () => ({type: RIVER});
const userHand = (hand) => ({type: USERHAND, hand});
const results = () => ({type: RESULTS});
const reset = () => ({type: RESET});
const allowSwitch = () => ({type: ALLOWSWITCH});
const settings = () => ({type: SETTINGS});
const closeSettings = () => ({type: CLOSESETTINGS});
const changeBackgroundImage = () => ({type: CHANGEBACKGROUNDIMAGE});
const backgroundImageClose = () => ({type: BACKGROUNDIMAGECLOSE});
const openCardBack = () => ({type: OPENCARDBACK});
const closeCardBack = () => ({type: CLOSECARDBACK});
const changeCardBack = (cardBack) => ({type: CHANGECARDBACK, cardBack});
const openTotalNumberOfHands = () => ({type: OPENTOTALNUMBEROFHANDS});
const closeTotalNumberOfHands = () => ({type: CLOSETOTALNUMBEROFHANDS});
const openHandRanks = () => ({type: OPENHANDRANKS});
const openTutorial = () => ({type: OPENTUTORIAL});
const tutorialPage = () => ({type: TUTORIALPAGE});
const startGame = () => ({type: STARTGAME});
const showMainMenu = () => ({type: SHOWMAINMENU});
const numberOfHands = () => ({type: NUMBEROFHANDS});
const updateNumberOfHands = (numberOfHands, numHandsImage) => ({type: UPDATENUMBEROFHANDS, numberOfHands, numHandsImage});
const updateBackgroundImage = (bg) => ({type: UPDATEBACKGROUNDIMAGE, bg});
const updateBet = (num) => ({type: UPDATEBET, num});
const increaseBet = () => ({type: INCREASEBET});
const decreaseBet = () => ({type: DECREASEBET});
const ladder = () => ({type: LADDER});
const showHideCards = () => ({type: SHOWHIDECARDS});
const onOffSFX = () => ({type: ONOFFSFX});
const openCloseProfile = () => ({type: OPENCLOSEPROFILE});
const openChangeName = () => ({type: OPENCHANGENAME});

// User updates
const UPDATEUSER = 'UPDATEUSER';

const updateUser = (userName, userCoins, userLadder, numberOfWins) => ({type:UPDATEUSER, userName, userCoins, userLadder, numberOfWins})

module.exports = {
  DEAL,
  deal,
  FLOP,
  flop,
  TURN,
  turn,
  RIVER,
  river,
  USERHAND,
  userHand,
  RESULTS,
  results,
  RESET,
  reset,
  ALLOWSWITCH,
  allowSwitch,
  SETTINGS,
  settings,
  CLOSESETTINGS,
  closeSettings,
  CHANGEBACKGROUNDIMAGE,
  changeBackgroundImage,
  BACKGROUNDIMAGECLOSE,
  backgroundImageClose,
  OPENCARDBACK,
  openCardBack,
  CLOSECARDBACK,
  closeCardBack,
  CHANGECARDBACK,
  changeCardBack,
  OPENTOTALNUMBEROFHANDS,
  openTotalNumberOfHands,
  CLOSETOTALNUMBEROFHANDS,
  closeTotalNumberOfHands,
  OPENHANDRANKS,
  openHandRanks,
  OPENTUTORIAL,
  openTutorial,
  TUTORIALPAGE,
  tutorialPage,
  STARTGAME,
  startGame,
  SHOWMAINMENU,
  showMainMenu,
  NUMBEROFHANDS,
  numberOfHands,
  UPDATENUMBEROFHANDS,
  updateNumberOfHands,
  UPDATEBACKGROUNDIMAGE,
  updateBackgroundImage,
  UPDATEUSER,
  updateUser,
  UPDATEBET,
  updateBet,
  INCREASEBET,
  increaseBet,
  decreaseBet,
  DECREASEBET,
  ladder,
  LADDER,
  showHideCards,
  SHOWHIDECARDS,
  onOffSFX,
  ONOFFSFX,
  openCloseProfile,
  OPENCLOSEPROFILE,
  openChangeName,
  OPENCHANGENAME
}