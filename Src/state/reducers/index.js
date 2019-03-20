import { combineReducers } from 'redux';
import applicationReducer from './applicationReducer';
import settingsReducer  from './settingsReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
  application: applicationReducer,
  settings: settingsReducer,
  user: userReducer
})

export default reducers;