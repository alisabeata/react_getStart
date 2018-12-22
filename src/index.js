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
  transactions: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MONEY':
      return {
        ...state, 
        balance: state.balance + action.payload,
        transactions: [
          ...state.transactions,
          {
            money: action.payload,
            descr: action.meta.descr
          }
        ]
      };

    case 'REMOVE_MONEY':
      return {
        ...state,
        balance: state.balance - action.payload,
        transactions: [
          ...state.transactions,
          {
            money: -action.payload,
            descr: action.meta.descr
          }
        ]
      };

    case 'PLUS_PERCENTS':
      return {
        ...state,
        balance: ~~(state.balance * 1.1),
        transactions: [
          ...state.transactions,
          {
            money: ~~(state.balance * 0.1),
            descr: 'add 10% percents'
          }
        ]
      };

    default:
      return state;
  }
};
const store = createStore(reducer, initialState, window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);

console.log(store.getState());

store.dispatch({
  type: 'ADD_MONEY', 
  payload: 1000, 
  meta: {
    descr: 'someDescr'
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

store.dispatch({
  type: 'PLUS_PERCENTS'
});

console.log(store.getState());