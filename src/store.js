import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './redusers';


export default initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      window.devToolsExtension
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );
  return store;
};