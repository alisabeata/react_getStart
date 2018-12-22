// import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(
//   <App  />,
//   document.getElementById('root')
// );

import {createStore} from 'redux';

const initialState = {
  balance: 0,
  transactions: [],
  groups: {}
};

const splitedReduser = (state = initialState, action) => ({
  balance: balance(state.balance, action),
  transactions: transactions(state.transactions, action),
  groups: groups(state.groups, action)
});

function balance(state = 0, action) {
  switch (action.type) {
    case 'ADD_MONEY':
    case 'PLUS_PERCENTS':
      return state + action.payload;
    case 'REMOVE_MONEY':
      return state - action.payload;
    default:
      return state;
  }
}

function transactions(state = [], action) {
  switch (action.type) {
    case 'ADD_MONEY':
    case 'PLUS_PERCENTS':
      return [
        ...state,
        {
          money: action.payload,
          descr: action.meta.descr
        }
      ];
    case 'REMOVE_MONEY':
      return [
        ...state,
        {
          money: -(action.payload),
          descr: action.meta.descr
        }
      ];
    default:
      return state;
  }
}

function groups(state = {}, action) {
  switch (action.type) {
    case 'ADD_MONEY':
    case 'REMOVE_MONEY':
    case 'PLUS_PERCENTS':
      return {
        ...state,
        [action.meta.descr]: (state[action.meta.descr
        ] || 0) + action.payload
      };
    default:
      return state;
  }
}

const store = createStore(splitedReduser, initialState, window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);

console.log(store.getState());

store.dispatch({
  type: 'ADD_MONEY', 
  payload: 1000, 
  meta: {
    descr: 'add money'
  }
});

store.dispatch({
  type: 'ADD_MONEY', 
  payload: 5000, 
  meta: {
    descr: 'add money'
  }
});

console.log(store.getState());

store.dispatch({
  type: 'REMOVE_MONEY', 
  payload: 300, 
  meta: {
    descr: 'payment'
  }
});

console.log(store.getState());

let add10Persent = Math.floor(store.getState().balance * 0.1);
store.dispatch({
  type: 'PLUS_PERCENTS',
  payload: add10Persent,
  meta: {
    descr: 'add 10% from bank'
  }
});

console.log(store.getState());