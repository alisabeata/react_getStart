import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';

const middleware = store => next => action => {
  return next(action);
};

const middleware1 = store => next => action => {
  const state = store.getState();
  store.dispatch({type: 'FROM_MIDDLEWARE'});
  const result = next(action);
  const nextState = state.getState();

  return result;
};

const middlewareSLowDown = store => next => action => {
  setTimeout(() => {
    next(action);
  }, 1000);
  
  return undefined;
};

export default () =>
  createStore(rootReducer, applyMiddleware(middleware));