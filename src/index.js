//import React, {Component, PureComponent} from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {createStore} from 'redux';

const reducer = (state = {}, action) => ({test: 'test'});
const store = createStore(reducer, {});

const App = () => null;

ReactDOM.render(
  <App/>, 
  document.getElementById('root')
);
