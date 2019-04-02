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

const numberOfHands = {
  'two' : require('../assets/main_menu/number_of_hands/Number_Of_Hands_2.png'),
  'three' : require('../assets/main_menu/number_of_hands/Number_Of_Hands_3.png'),
  'four' : require('../assets/main_menu/number_of_hands/Number_Of_Hands_4.png'),
  'five' : require('../assets/main_menu/number_of_hands/Number_Of_Hands_5.png'),
  'six' : require('../assets/main_menu/number_of_hands/Number_Of_Hands_6.png'),
  'seven' : require('../assets/main_menu/number_of_hands/Number_Of_Hands_7.png'),
  'eight' : require('../assets/main_menu/number_of_hands/Number_Of_Hands_8.png'),
  'nine' : require('../assets/main_menu/number_of_hands/Number_Of_Hands_9.png'),
  'ten' : require('../assets/main_menu/number_of_hands/Number_Of_Hands_10.png'),
}

const avatars = {
  'pony' : require('../assets/profile/avatars/Avatar_Checka.png')
}

export default constants = { 
  backgroundPossibilities,
  cardBackOptions,
  winningsPercents,
  numberOfHands,
  avatars
}