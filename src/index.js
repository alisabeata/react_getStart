import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

class SecondChild extends Component {
  static contextTypes = {
    store: PropTypes.object,
    addListener: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      store: this.context.store;
    };
    this.context.addListener(this.handleUpdateStore)
  }

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
    store: PropTypes.object,
    addListener: PropTypes.func
  };

  // глобальный объект
  store = {
    firstName: 'Alice',
    secondName: 'Doe'
  };

  store.onUpdate({
    listeners.forEach(listner => listner(nextStore))
  });

  getChildContext() {
    return {store, addListener};
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