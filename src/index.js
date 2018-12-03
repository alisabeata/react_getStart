import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

class SecondChild extends Component {
  static contextTypes = {
    color: PropTypes.string
  };

  render() {
    console.log(this.context)
    return (
      <p style={{color: this.context.color}}>2</p>
    );
  }
}

class FirstChild extends Component {
  render() {
    return (
      <div>
        <span>1</span>
        <SecondChild />
      </div>
    );
  }
}

class App extends Component {
  static childContextTypes = {
    color: PropTypes.string
  };

  getChildContext() {
    return {color: 'blue'};
  }

  render() {
    return (
      <div>
        <FirstChild />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));