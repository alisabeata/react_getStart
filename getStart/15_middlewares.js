// redux middlewares

// middlewares доп слой логики перед отправкой экшенов в стор
// используют для логирования, обработки ошибок, общению с асинхронным API и пр.

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