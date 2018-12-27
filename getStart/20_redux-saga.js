// Redux-saga


yarn add redux-saga

import createSagaMiddleware from 'redux-saga'; 


// слой в моддлварах, который имеет доступ к стейту, может реагировать/диспатчить экшены
// полезна для описания сетевых запросов, инпут-аутпут операций, работы с локальным кэшем
// те убирает побочные эффекты и нечистые функции из приложения на уровень отдельного слоя
// взаимодействует только с экшенз
// саги описываются с помощью генераторов


// in store.js
...
import createSagaMiddleware from 'redux-saga'; 
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      window.devToolsExtension
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};


// in sagas.js
export default function* () {}


// в сагах функция, которая следит за экшенами, называется вотчером 
 

// - takeEvery
import {takeEvery} from 'redux-saga/effects';
import {FETCH_SHOW_REQUEST} from './actions';

export default function* () {
  yield takeEvery(FETCH_SHOW_REQUEST, function* () {})
}

// takeEvery ожидает два параметра, первый экшн, второй функция/генератор, который будет реагировать на этот тип экшена
// takeEvery('*', function* () {}) будет реагировать на все экшены
// takeEvery([..., ....], function* () {}) экшены можно передавать массивом

// генератор из второго аргумента лучше выносить из вызова

function* onFetchShowRequest(action) {
  
}

export default function* () {
  yield takeEvery(FETCH_SHOW_REQUEST, onFetchShowRequest);
}


// - select
import {takeEvery, select} from 'redux-saga/effects';

// select получает значение из хранилища

function* onFetchShowRequest(action) {
  const showId = yield select(getShowId)
}

// getShowId is (in redusers.js)
// export const getShowId = state => state.showId;


