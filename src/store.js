import {createStore, compose} from 'redux';
import rootReducer from './reducers';

export default (initialState = undefined) => {
  return createStore(
    rootReducer,
    initialState,
    compose(window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
  );
};