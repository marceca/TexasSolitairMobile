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
  3 : .75,
  4 : 1,
  5 : 1.5,
  6 : 2,
  7 : 2.5,
  8 : 3,
  9 : 4,
  10 : 5
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
  'ten' : require('../assets/main_menu/number_of_hands/Number_Of_Hands_10.png')
}

const avatars = {
  'death' : require('../assets/profile/avatars/Avatar_Death.png'),
  'clown' : require('../assets/profile/avatars/Avatar_Clown.png'),
  'cowboy' : require('../assets/profile/avatars/Avatar_Cowboy.png'),
  'jobStress' : require('../assets/profile/avatars/Avatar_Job_Stress.png'),
  'lamb' : require('../assets/profile/avatars/Avatar_Lamb.png'),
  'puppy' : require('../assets/profile/avatars/Avatar_Puppy.png'),
  'zombie' : require('../assets/profile/avatars/Avatar_Zombie_Boy.png')
}

const avatarBackgroundColors = {
  'black' : require('../assets/profile/avatars/backgroundColors/Avatar_BG_Black.png'),
  'blue' : require('../assets/profile/avatars/backgroundColors/Avatar_BG_Blue.png'),
  'green' : require('../assets/profile/avatars/backgroundColors/Avatar_BG_Green.png'),
  'orange' : require('../assets/profile/avatars/backgroundColors/Avatar_BG_Orange.png'),
  'red' : require('../assets/profile/avatars/backgroundColors/Avatar_BG_Red.png'),
  'white' : require('../assets/profile/avatars/backgroundColors/Avatar_BG_White.png')
}

export default constants = { 
  backgroundPossibilities,
  cardBackOptions,
  winningsPercents,
  numberOfHands,
  avatars,
  avatarBackgroundColors
}