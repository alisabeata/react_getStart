import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import createStore from './store';
import {normalize, schema} from 'normalizr';


const store = createStore();

store.subscribe(() => {
  console.log(store.getState());
});

const showSchema = new schema.Entity('show');

fetch('http://api.tvmaze.com/shows/1?embed=cast', {
  cors: true
})
  .then(response => response.json())
  .then(show => console.log(normalize(show, showSchema)));

ReactDOM.render(<App />, document.getElementById('root'));