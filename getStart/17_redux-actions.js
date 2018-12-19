// redux-actions

yarn add redux-actions

import {createAction} from 'redux-actions'

// при использовании redux-actions не нужно исп отдельный файл для типов

// createAction создаёт action creator
 
export const fetchEpisodesRequest = createAction('FETCH_EPISODS_REQUEST');

// вызов функции с аргументом (объектом), автоматически добавляет его в payload
fetchEpisodesRequest({data: 'data'});

// аналогично
action = {
  type: 'FETCH_EPISODS_REQUEST',
  payload: {data: 'data'}
};

// если аргументом передаётся ошибка, добавляется поле error
fetchEpisodesRequest(new Error('error text'));

// аналогично
action = {
  type: 'FETCH_EPISODS_REQUEST',
  error: new Error('error text')
};

// если вывзвать метод .toString(), то функция возвращает свой тип экшена
fetchEpisodesRequest.toString(); // >>> 'FETCH_EPISODS_REQUEST'



// meta можно передать при вызове
export const fetchEpisodesSuccess = createAction(
  'FETCH_EPISODS_SUCCESS',
  fnPayloadCreator() {},
  fnMetaCreator() {}
);
