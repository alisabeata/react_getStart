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

const characterSchema = new schema.Entity('character');
const personSchema = new schema.Entity('person');

const showSchema = new schema.Entity('show', {
  _embedded: {
    cast: new schema.Array({
      person: personSchema,
      character: characterSchema
    })
  }
});


fetch('http://api.tvmaze.com/shows/100?embed=cast', {
  cors: true
})
  .then(response => response.json())
  .then(show => {
    store.dispatch({
      type: 'SHOW_SUCCESS',
      payload: normalize(show, showSchema)
    });
    console.log(normalize(show, showSchema));
  });

ReactDOM.render(<App />, document.getElementById('root'));