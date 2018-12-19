// redux-actions

yarn add redux-actions



// - createAction

import {createAction} from 'redux-actions';

// при использовании redux-actions не нужно исп отдельный файл для типов
// createAction создаёт action creator
 
export const fetchEpisodesRequest = createAction('FETCH_EPISODES_REQUEST');

// вызов функции с аргументом (объектом), автоматически добавляет его в payload
fetchEpisodesRequest({data: 'data'});

// аналогично
action = {
  type: 'FETCH_EPISODES_REQUEST',
  payload: {data: 'data'}
};

// если аргументом передаётся ошибка, добавляется поле error
fetchEpisodesRequest(new Error('error text'));

// аналогично
action = {
  type: 'FETCH_EPISODES_REQUEST',
  error: new Error('error text')
};

// если вывзвать метод .toString(), то функция возвращает свой тип экшена
fetchEpisodesRequest.toString(); // >>> 'FETCH_EPISODES_REQUEST'



// meta можно передать при вызове
export const fetchEpisodesSuccess = createAction(
  'FETCH_EPISODES_SUCCESS',
  fnPayloadCreator() {},
  fnMetaCreator() {}
);



// - createActions
// более короткая запись, FETCH_EPISODES_REQUEST автоматически сохраняется как fetchEpisodesRequest
const actionCreators = createActions({
  FETCH_EPISODES_REQUEST: undefined,
  FETCH_EPISODES_SUCCESS: [
    episodes => episodes,
    episodes => ({length: episodes.length})
  ],
  FETCH_EPISODES_FAILURE: undefined
});

// без объявление переменной, с деструктуризацией
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

// есть возможность создавать неймспейсы, делая вложенность объектов
export const {
  video: {
    fetchEpisodesRequest,
    fetchEpisodesSuccess,
    fetchEpisodesFailure
  }
} = createActions({
  VIDEO: {
    FETCH_EPISODES_REQUEST: undefined,
    FETCH_EPISODES_SUCCESS: [
      episodes => episodes,
      episodes => ({length: episodes.length})
    ],
    FETCH_EPISODES_FAILURE: undefined
  }
});
// >>> пример: VIDEO/FETCH_EPISODES_REQUEST



// - handleAction
// обработка экшена

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
  [fetchEpisodesRequest]: () => true,
  [fetchEpisodesSuccess]: () => false,
  [fetchEpisodesFailure]: () => false
}, false); 
// false -- в данном случае дефолтный стейт

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
