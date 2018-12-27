import {takeEvery, select} from 'redux-saga/effects';
import {FETCH_SHOW_REQUEST} from './actions';
import {getShowId} from './redusers';
import {fetchShow} from './api';

function* onFetchShowRequest(action) {
  const showId = yield select(getShowId);
  console.log(showId);
  const show = yield fetchShow(showId);
  console.log(show);
}

export default function* () {
  yield takeEvery(FETCH_SHOW_REQUEST, onFetchShowRequest);
}