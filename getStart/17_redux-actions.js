// redux-actions

yarn add redux-actions

// https://redux-actions.js.org/introduction/tutorial

// объединяет actionTypes и actionCreators
// позволяет типы экшенов держать в экшен криэйторах

// - createAction
import {createAction} from 'redux-actions';
// or
import {createActions} from 'redux-actions';


// простой createActions (только с типами)
export const {
  fetchShowRequest, 
  fetchShowSuccess, 
  fetchShowFailure} = createActions(
    'FETCH_SHOW_REQUEST',
    'FETCH_SHOW_SUCCESS',
    'FETCH_SHOW_FAILURE'
  );


// (!) при использовании redux-actions не нужно исп отдельный файл для типов
// createAction создаёт action creator
 
export const fetchEpisodesRequest = createAction('FETCH_EPISODES_REQUEST');

// (!) вызов функции с аргументом (объектом), автоматически добавляет его в payload
fetchEpisodesRequest({data: 'data'});
// аналогично
action = {
  type: 'FETCH_EPISODES_REQUEST',
  payload: {data: 'data'}
};

// (!) если аргументом передаётся ошибка, добавляется поле error
fetchEpisodesRequest(new Error('error text'));
// аналогично
action = {
  type: 'FETCH_EPISODES_REQUEST',
  error: new Error('error text')
};

// (!) если вызвать метод .toString(), то функция возвращает свой тип экшена
fetchEpisodesRequest.toString(); // >>> 'FETCH_EPISODES_REQUEST'



// meta можно передать при вызове третьим параметром
export const fetchEpisodesSuccess = createAction(
  'FETCH_EPISODES_SUCCESS',
  fnPayloadCreator() {},
  fnMetaCreator() {}
);



// - createActions
// более короткая запись, FETCH_EPISODES_REQUEST автоматически сохраняется как fetchEpisodesRequest
const actionCreators = createActions({
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS: [
    episodes => episodes,
    episodes => ({length: episodes.length})
  ],
  FETCH_EPISODES_FAILURE,
});

// без объявление переменной, с деструктуризацией
export const {
  fetchEpisodesRequest,
  fetchEpisodesSuccess,
  fetchEpisodesFailure
} = createActions({
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS: [
    episodes => episodes,
    episodes => ({length: episodes.length})
  ],
  FETCH_EPISODES_FAILURE,
});

// есть возможность создавать неймспейсы, делая вложенность объектов
export const {
  video: {
    fetchEpisodesRequest,
    fetchEpisodesSuccess,
    fetchEpisodesFailure
  }
} = createActions({
  VIDEO: {
    FETCH_EPISODES_REQUEST,
    FETCH_EPISODES_SUCCESS: [
      episodes => episodes,
      episodes => ({length: episodes.length})
    ],
    FETCH_EPISODES_FAILURE,
  }
});
// >>> пример: VIDEO/FETCH_EPISODES_REQUEST



// - handleAction
// обработка экшенов
import {handleAction} from 'redux-actions';

// in redusers.js
const episodes = handleAction(fetchEpisodesSuccess, (state = [], action) => action.payload, []);
// аналогично
const episodes = (state = [], action) => {
  if (action.type = fetchEpisodesSuccess.toString()) {
    return action.payload;
  }
  return state;
};



// - handleActions
// обработка нескольких экшенов
import {handleActions} from 'redux-actions';

const isFetching = handleActions({
  [fetchEpisodesRequest.toString()]: () => true,
  [fetchEpisodesSuccess.toString()]: () => false,
  [fetchEpisodesFailure.toString()]: () => false,
}, false); 
// false — в данном случае initialState

// аналогично
const isFetching = (state = false, action) => {
  switch(action.type) {
    case fetchEpisodesRequest.toString():
      return true;
    case fetchEpisodesSuccess.toString():
      return false;
    case fetchEpisodesFailure.toString():
      return false;
    default:
      return false;
  }
};

// получение данных с handleActions

/*export const LOADING_STATE = {idle: 'IDLE', loading: 'LOADING', success: 'SUCCESS', failure: 'FAILURE'}; // флаги состояния */

const series = handleActions(
  {
    [getSeriesSuccess.toString()]: (state, action) => state.concat(action.payload),
  }, 
  [],
); // [] — в данном случае initialState
                             
const loadingState = handleActions(
  {
    [getSeriesRequest.toString()]: () => LOADING_STATE.loading,
    [getSeriesSuccess.toString()]: () => LOADING_STATE.success,
    [getSeriesFailure.toString()]: () => LOADING_STATE.failure,
  }, 
  LOADING_STATE.idle,
); // LOADING_STATE.idle — в данном случае initialState

const error = handleActions(
  {
    [getSeriesFailure.toString()]: (state, action) => action.error,
  }, 
  null,
); // null — в данном случае initialState
      
export default combineReducers({
  series,
  loadingState,
  error,
});
