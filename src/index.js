import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);

    console.log('App constructor');

    this.state = {
      arg: props.arg
    };
  }
  render() {
    return 'text';
  }
}

ReactDOM.render(<App arg={1} />, document.getElementById('root'));