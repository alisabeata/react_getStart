import {fetchShowSuccess} from './actions';
import {handleActions} from 'redux-actions';
import {combineReducers} from 'redux';

const showId = handleActions({}, 666);
const show = handleActions({
  [fetchShowSuccess]: (state, action) => action.payload
}, null);

export default combineReducers({
  showId,
  show
});

export const getShowId = state => state.showId;