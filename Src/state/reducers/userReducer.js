import * as types from '../actions/actions';

const initState = {
  name: null
}

const userReducer = (state = initState, action) => {
  switch(action.type) {

    case types.UPDATEUSERNAME:
      const updateUserNameState = Object.assign({}, state);
      updateUserNameState.name = action.userName;
    return updateUserNameState

    default:
      return state
  }
}

export default userReducer;