import {fetchEpisodesRequest, fetchEpisodesSuccess, fetchEpisodesFailure} from './actions';

const initState = {
  episodes: [],
  error: null,
  isFetching: false,
  isFetched: false
};

export default (state = initState, action) => {
  switch(action.type) {
    case fetchEpisodesRequest.toString():
      return {...state, isFetching: true, isFetched: false};

    case fetchEpisodesSuccess.toString():
      return {...state, isFetching: false, isFetched: true, episodes: action.payload};

    case fetchEpisodesFailure.toString():
      return {...state, isFetching: false, isFetched: true, error: action.error}

    default:
      return state;
  }
};

export const getEpisodes = state => state.episodes;
export const getIsFetching = state => state.isFetching;
export const getIsFetched = state => state.isFetched;
export const getError = state => state.error;