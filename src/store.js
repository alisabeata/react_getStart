import {createStore, compose} from 'redux';
import rootReducer from './reducers';

export default (initialState = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(window.devToolsExtension ? window.__REDUX_DEVTOOLS__() : f => f)
  );

  return store;
};