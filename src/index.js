import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();

const list = [1, 2, 3, 4, 5];

class Time extends Component {
  render() {
    return (
      <div>
        <p className="test">{1 + 1}</p>
        <p>{new Date().toString()}</p>
        <ul>
          {list.map(el => <li key={el}>{el}</li>)}
        </ul>
      </div>
    );
  }
}

// setTimeout(() => {
//   ReactDOM.render(<Time />, document.getElementById('root'))
// }, 1000);