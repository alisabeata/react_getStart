import {takeEvery, select, call, put} from 'redux-saga/effects';
import {
  FETCH_SHOW_REQUEST, 
  fetchShowSuccess,
  fetchShowFailure
} from './actions';
import {getShowId} from './redusers';
import {fetchShow} from './api';

function* onFetchShowRequest() {
  const showId = yield select(getShowId);
  
  try {
    const show = yield call(fetchShow, showId);
    yield put(fetchShowSuccess(show));
  } catch (error) {
    yield put(fetchShowFailure(error));
  }
}

export default function* () {
  yield takeEvery(FETCH_SHOW_REQUEST, onFetchShowRequest);
}