//import React, {Component, PureComponent} from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {createStore} from 'redux';

const reducer = (state = {count: 0}, action) => {
  switch(action.type) {
    case 'ADD_COMMENT':
      return {...state, count: state.count + 1};
    default:
      return state;
  }
};

const store = createStore(reducer);

const action = {
  type: 'ADD_COMMENT'
};

store.dispatch(action);
console.log(store.getState());



const App = () => null;

ReactDOM.render(
  <App/>, 
  document.getElementById('root')
);
