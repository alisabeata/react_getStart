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

const fetchEpisodesRequest = () => ({
  type: FETCH_EPISODS_REQUEST
});


class App extends Component {
  componentDidMount() {
    const {isFetched} = this.props;
    if (!isFetched) {
      this.props.fetchEpisodesRequest();
    }
  }

  render() { 
    const {episodes, error, isFetching} = this.props;

    if (isFetching) {
      return <div>Loading...</div>;
    }

    if (error !== null) {
      return <div>Error: {error}</div>;
    }

    return <div>{episodes.map(item => <div key={item.id}>{item.summary}</div>)}</div>;
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
