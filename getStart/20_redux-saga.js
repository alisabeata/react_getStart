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

function* onFetchShowRequest() {
  
}

export default function* () {
  yield takeEvery(FETCH_SHOW_REQUEST, onFetchShowRequest);
}


// - select
import {select} from 'redux-saga/effects';

// select получает значение из хранилища

function* onFetchShowRequest() {
  const showId = yield select(getShowId)
}

// getShowId is (in redusers.js)
// export const getShowId = state => state.showId;

// для тестирования нужно проверять, что select вызывается с опред аргументом
// expect(generatorName.next()).toEqual(select(getShowId))



// - call
import {call} from 'redux-saga/effects';

// call удобно использовать для тестирования при вызове промайсов
// тестируется на наличие аргументов, котор необходимы для формирования промайса
// expect(generatorName.next()).toEqual(call(fetchShow, showId))

import {fetchShow} from './api';

function* onFetchShowRequest() {
  const showId = yield select(getShowId);
  console.log(showId);
  const show = yield call(fetchShow, showId); // аналог fetchShow(showId)
  console.log(show);
}


// - put
import {put} from 'redux-saga/effects';

// put отправляет экшен
function* onFetchShowRequest() {
  ...
  yield put(fetchShowSuccess(show));
}


// - обработка ошибок
// через try/catch
function* onFetchShowRequest() {
  ...
  try {
    const show = yield call(fetchShow, showId);
    yield put(fetchShowSuccess(show));
  } catch (error) {
    yield put(fetchShowFailure(error));
  }
}


// - fork
import {fork} from 'redux-saga/effects';

// fork используют в рутовой саге
// нужен для импорта вотчеров (запуска генераторов)

function* onFetchShowWatch() {
  yield takeEvery(FETCH_SHOW_REQUEST, onFetchShowRequest);
}

function* onOtherWatch() {
  yield takeEvery(FETCH_OTHER_REQUEST, onOtherWatchRequest);
}

export default function* () {
  yield fork(onFetchShowWatch);
  yield fork(onOtherWatch);
}


// - takeLatest
import {takeLatest} from 'redux-saga/effects';

// более предпочтительный аналог takeEvery для исп пользовательского ввода, тк исп только последний вызов
// при повторных экшенах/запусках отменяет выполнение
// до конца исп только тот генератор, который был вызван последним

