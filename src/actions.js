export const FETCH_SHOW_REQUEST = 'FETCH_SHOW_REQUEST';
export const FETCH_SHOW_SUCCESS = 'FETCH_SHOW_SUCCESS';
export const FETCH_SHOW_FAILURE = 'FETCH_SHOW_FAILURE';

export const fetchShowRequest = () => ({
  type: FETCH_SHOW_REQUEST
});

export const fetchShowSuccess = payload => ({
  type: FETCH_SHOW_SUCCESS,
  payload
});

export const fetchShowFailure = () => ({
  type: FETCH_SHOW_FAILURE
});