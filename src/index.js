import React, {Component, PureComponent} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import createStore from './store';
import {addComment} from './actions/commentsActions';
import {Provider, connect} from 'react-redux';

const store = createStore();

store.dispatch(addComment('comment text from payload...'));

store.dispatch({
  type: 'ADD_USER', 
  payload: 'Username'
});

class App extends PureComponent {
  render() { 
    return (
      <div>App content</div>
    );
  }
}

let AppWithRedux = connect()(App);

ReactDOM.render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>, 
  document.getElementById('root')
);
