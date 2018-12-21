import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


export const Header = props => (
  <h1 className={props.className}>{props.children}</h1>
);

class App extends Component {
  state = {
    value: 'test state'
  };

  render() {
    const {value} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Header className="App-title">Welcome to React</Header>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-text">{value}</p>
      </div>
    );
  }
}

export default App;
