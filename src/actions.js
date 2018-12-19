import {createAction, createActions} from 'redux-actions';

// export const fetchEpisodesRequest = createAction('FETCH_EPISODES_REQUEST');
// export const fetchEpisodesSuccess = createAction('FETCH_EPISODES_SUCCESS');
// export const fetchEpisodesFailure = createAction('FETCH_EPISODES_FAILURE');

export const {
  fetchEpisodesRequest,
  fetchEpisodesSuccess,
  fetchEpisodesFailure
} = createActions({
  FETCH_EPISODES_REQUEST: undefined,
  FETCH_EPISODES_SUCCESS: [
    episodes => episodes,
    episodes => ({length: episodes.length})
  ],
  FETCH_EPISODES_FAILURE: undefined
});