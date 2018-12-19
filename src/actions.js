import {createAction} from 'redux-actions';

export const fetchEpisodesRequest = createAction('FETCH_EPISODS_REQUEST');
export const fetchEpisodesSuccess = createAction('FETCH_EPISODS_SUCCESS');
export const fetchEpisodesFailure = createAction('FETCH_EPISODS_FAILURE');