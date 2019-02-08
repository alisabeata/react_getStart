// redux-saga

// https://redux-saga.js.org/

yarn add redux-saga

import createSagaMiddleware from 'redux-saga';

// cаги подключаются как middleware, и работают в своем слое
// имеют доступ к стейту, могут реагировать/диспатчить экшены
// полезна для описания сетевых запросов, инпут-аутпут операций, работы с локальным кэшем
// те убирает побочные эффекты и нечистые функции из приложения на уровень отдельного слоя
// взаимодействует только с экшенз
// саги описываются с помощью генераторов
// редакс-сага берёт на себя управление побочными эффектами

// если представлять организацию взаимодействия редакса-реакта как MVC,
// то M — это redux, V — react, C — redux-saga
// M — доступ к данным, управление данными
// V — предоставление данных, внешний вид
// C — работа с сетью, работа с ассинхронными операциями, локалсторадж



function* episodeWatcher() {
  yield takeEvery(getSeriesRequest, seriesFlow);
}

function* seriesFlow() {
  try {
    const response = yield call(api.getSeries);
    yield put(getSerieSuccess(response));
  } catch (error) {
    yield put(getSerieFailure(error));
  }
}



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

// (!) takeEvery и takeLatest явл высокоуровневыми функциями, которые работают поверх медотов

// пример реализации takeEvery
// для этого исп методы take, fork
import {take, fork} from 'redux-saga/effects';

export default function* takeEvery(
  pattern,
  saga,
  ...args
) {
  while (true) {
    const action = yield take(pattern)
    yield fork(saga, ...args.concat(action))
  }
}


// в сагах есть два типа эффектов -- блокирующие и не блокирующие
// take -- блокирующий
// fork -- не блокирующий


// реализация лоадера через саги
// привязывается к типу экшена
export default function* pageLoaderFlow() {
  while (true) {
    yield take(({type: pattern}) => pattern.includes('_REQUEST'));
    let count = 1;
    
    yield put({type: 'LOADER/START_PAGE_LOADER'});
    
    while (count !== 0) {
      const action = yield take(
        ({type: pattern}) => 
          pattern.includes('_REQUEST') ||
          pattern.includes('_FAILURE') ||
          pattern.includes('_SUCCESS')
      );
      
      if (action.type.includes('_REQUEST')) {
        count += 1;
      } else {
        count -= 1;
      }
      
      yield put({
        type: 'PROGRESS_PAGE_LOADER',
        payload: count
      });
    }
    
    yield put({type: 'LOADER/STOR_PAGE_LOADER'});
  }
}

// - cancel / cancelled
// отмена задач
// https://ru.redux-saga.js.org/soderzhanie/advanced/taskcancellation



// - этапы переноса сетевых запросов из компонента в саги
// 1. вынести все запросы в api.js
// 2. см пример in store.js выше
// 3. структура в дериктории sagas
// - in index.js
import {fork} from 'redux-saga/effects';
import {imageRequestWatcher} from './somerequest';

export default function* () {
  yield fork(imageRequestWatcher);
}
// - somerequest.js
import {takeEvery, call} from 'redux-saga/effects';
import {getImgageRequest} from './actions';

function imageRequestFlow() {
  const response = yield
}

export default function* imageRequestWatcher() {
  yield takeEvery(getImgageRequest.toString(), (action) => {
    console.log(action);
    console.log('imageRequestWatcher is running');
  });
}
