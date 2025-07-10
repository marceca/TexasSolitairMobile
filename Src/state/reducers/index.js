import { combineReducers } from 'redux';

// V2 settings reducer
import settingsReducer from '../v2/reducers/settingsReducer';

// Existing reducers
import applicationReducer from './applicationReducer';

const reducers = combineReducers({
  application: applicationReducer,
  settings: settingsReducer,
});

export default reducers;
