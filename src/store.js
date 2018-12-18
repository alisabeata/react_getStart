import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';

const FETCH_EPISODS_REQUEST = 'FETCH_EPISODS_REQUEST';
const FETCH_EPISODS_SUCCESS = 'FETCH_EPISODS_SUCCESS';
const FETCH_EPISODS_FAILURE = 'FETCH_EPISODS_FAILURE';

const fetchEpisodesRequest = () => ({
  type: FETCH_EPISODS_REQUEST
});
const fetchEpisodesSuccess = payload => ({
  type: FETCH_EPISODS_SUCCESS,
  payload
}); 
const fetchEpisodesFailure = error => ({
  type: FETCH_EPISODS_FAILURE,
  error
});


const middleware = store => next => action => {
  if (action.type === FETCH_EPISODS_REQUEST) {
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