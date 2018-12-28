import {
  FETCH_SHOW_REQUEST, 
  FETCH_SHOW_SUCCESS, 
  FETCH_SHOW_FAILURE} from './actions';

export default (state = {showId: 666, show: null}, action) => {
  console.log(state, action);
  switch (action.type) {
    case FETCH_SHOW_SUCCESS:
      return {...state, show: action.payload};
    default:
      return state;
  }
};

export const getShowId = state => state.showId;