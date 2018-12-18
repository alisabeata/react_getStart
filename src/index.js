import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import createStore from './store';
import {Provider, connect} from 'react-redux';

import {
  getEpisodes, 
  getIsFetching, 
  getIsFetched, 
  getError} from './reducers';

const store = createStore();

const FETCH_EPISODS_REQUEST = 'FETCH_EPISODS_REQUEST';
const FETCH_EPISODS_SUCCESS = 'FETCH_EPISODS_SUCCESS';
const FETCH_EPISODS_FAILURE = 'FETCH_EPISODS_FAILURE';

const fetchEpisodesRequest = () => ({
  type: FETCH_EPISODS_REQUEST
});
const fetchEpisodesSuccess = () => ({
  type: FETCH_EPISODS_SUCCESS
}); 
const fetchEpisodesFailure = () => ({
  type: FETCH_EPISODS_FAILURE
});


class App extends Component {
  componentDidMount() {
    this.props.fetchEpisodesRequest();
  }

  render() { 
    const {isFetching} = this.props;

    if (isFetching) {
      return <div>Loading...</div>
    }

    return <div />;
  }
}

const mapStateToProps = state => ({
  episodes: getEpisodes(state), 
  error: getError(state),
  isFetching: getIsFetching(state), 
  isFetched: getIsFetched(state)
});

const mapDispatchToProps = {fetchEpisodesRequest};

const EnchancedApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <EnchancedApp />
  </Provider>,
  document.getElementById('root')
);
