//import React, {Component, PureComponent} from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import createStore from './store';

const store = createStore();

store.dispatch({
  type: 'ADD_COMMENT', 
  payload: 'comment text...'
});

store.dispatch({
  type: 'ADD_USER', 
  payload: 'Username'
});

const App = () => null;

ReactDOM.render(
  <App/>, 
  document.getElementById('root')
);
