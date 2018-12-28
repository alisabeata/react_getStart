import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import createStore from './store';
import {fetchShowRequest} from './actions';

const store = createStore();

store.dispatch(fetchShowRequest());

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(<App />, document.getElementById('root'));