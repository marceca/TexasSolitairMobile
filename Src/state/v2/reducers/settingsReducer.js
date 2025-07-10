import { TOGGLE_DISCARDED_CARDS } from '../actions/settingsActions';

const initialState = {
  showDiscardedCards: true,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DISCARDED_CARDS:
      return {
        ...state,
        showDiscardedCards: !state.showDiscardedCards,
      };
    default:
      return state;
  }
};

export default settingsReducer;
