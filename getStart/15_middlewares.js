// redux middlewares

// middlewares доп слой логики перед отправкой экшенов в стор
// используют для логирования, обработки ошибок, общению с асинхронным API и пр.

// (!) прежде чем писать функциональность работы с сетью и пр в мидлварах, рекомендуется проверить наличие готовых решений (их масса)
// redux-localstorage
// https://github.com/elgerlambert/redux-localstorage

// мидлвары нужно оборачивать applyMiddleware
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';

const middleware = store => next => action => {
  return next(action);
};

export default () =>
  createStore(rootReducer, initState,  applyMiddleware(middleware));


// next(action) делает отправку экшена к редьюсерам

const middleware1 = store => next => action => {
  const state = store.getState(); // << получает текущий стейт
  store.dispatch({type: 'FROM_MIDDLEWARE'});
  const result = next(action);
  const nextState = state.getState(); // << получает след стейт после отработки экшен

  return result;
};


const result = store.dispatch({type: 'SOME_TYPE'});
console.log(result); // при наличии мидлвара возвр результат его выполнения


// (!) store enhancers подключаются через compose(), напр DevTools, 
// тк им нужна большая функциональность, чем предоставляет applyMiddleware
import {createStore, applyMiddleware, compose} from 'redux';

// compose вызывает каждый аргумент в контексте предыдущего

// чтобы исп compose и middlewares
export default () =>
  createStore(
      rootReducer,
      initState,
      compose(
        applyMiddleware(middleware), 
        window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
      )
  );


// (пример) замер производительности редьюсеров
export function execTime(store) {
  return function (next) {
    return function (action) {
      console.time('redux exec');
      const result = next(action);
      console.timeEnd('redux exec');
      return result;
    }
  }
}
