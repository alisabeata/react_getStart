// ducks-modular-redux
// https://github.com/erikras/ducks-modular-redux

// способ организации кода


// in ducks/auth.js
import { appName } from '../config';

// const
export const moduleName = 'auth';
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`;

// reducer
export default function reducer(state, action) {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
}

// action creator (with thunk)
export function signUp(email, password) {
  return dispatch => {
    console.log('----', 'sign up');
  };
}


// in ../reducer.js
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer, { moduleName as authModule } from '../ducks/auth';

export default history =>
  combineReducers({
    router: connectRouter(history),
    // rest of your reducers
    [authModule]: authReducer
  });
