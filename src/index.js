import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import createStore from './store';

const store = createStore();

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(<App />, document.getElementById('root'));