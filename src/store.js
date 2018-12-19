import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './redusers';
import {fetchEpisodesRequest, fetchEpisodesSuccess, fetchEpisodesFailure} from './actions';

const middleware = store => next => action => {
  if (action.type === fetchEpisodesRequest.toString()) {
    fetch('http://api.tvmaze.com/shows/180/episodes', {
      method: 'GET',
      mode: 'cors'
    })
    .then(response => response.json())
    .then(episodes => {
      console.log(episodes)
      store.dispatch(
        fetchEpisodesSuccess(episodes)
      );
    })
    .catch(error => {
      store.dispatch(
        fetchEpisodesFailure(error)
      );
    });
  }
  return next(action);
};

export default () =>
  createStore(
      rootReducer, 
      compose(
        applyMiddleware(middleware), 
        window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
      )
  );