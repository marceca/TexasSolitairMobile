const backgroundPossibilities = {
  'wood' : require('../assets/backgrounds/brown_design_hardwood.jpg'),
  'dark_stone' : require('../assets/backgrounds/Dark_Stone.jpg'),
  'dogs' : require('../assets/backgrounds/Dogs_Playing_Poker.jpg'),
  'light_rays' : require('../assets/backgrounds/Light_Rays.png'),
  'ocean' : require('../assets/backgrounds/Ocean.jpg'),
  'peadceful_lake' : require('../assets/backgrounds/Peaceful_Lake.jpg'),
}

const cardBackOptions = {
  'red' : require('../assets/settings_page/Red_Card_Back.png'),
  'blue' : require('../assets/settings_page/Blue_Card_Back.png'),
  'logo' : require('../assets/settings_page/Logo_Card_Back.png'),
  'deadly' : require('../assets/settings_page/Deadly_Woman_Card_Back.png')
}

const winningsPercents = {
  2 : .5,
  3 : .66,
  4 : .75,
  5 : .9,
  6 : 1,
  7 : 1.2,
  8 : 1.5,
  9 : 2
}

export default constants = { 
  backgroundPossibilities,
  cardBackOptions,
  winningsPercents
}