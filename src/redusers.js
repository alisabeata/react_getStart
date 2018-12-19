import {combineReducers} from 'redux';

// mast be in actions/ types
const FETCH_EPISODS_REQUEST = 'FETCH_EPISODS_REQUEST';
const FETCH_EPISODS_SUCCESS = 'FETCH_EPISODS_SUCCESS';
const FETCH_EPISODS_FAILURE = 'FETCH_EPISODS_FAILURE';


const initState = {
  episodes: [],
  error: null,
  isFetching: false,
  isFetched: false
};

export default (state = initState, action) => {
  switch(action.type) {
    case FETCH_EPISODS_REQUEST:
      return {...state, isFetching: true, isFetched: false};

    case FETCH_EPISODS_SUCCESS:
      return {...state, isFetching: false, isFetched: true, episodes: action.payload};

    case FETCH_EPISODS_FAILURE:
      return {...state, isFetching: false, isFetched: true, error: action.error}

    default:
      return state;
  }
};

export const getEpisodes = state => state.episodes;
export const getIsFetching = state => state.isFetching;
export const getIsFetched = state => state.isFetched;
export const getError = state => state.error;