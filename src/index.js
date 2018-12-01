import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ModalWindow extends Component {
  render() { 
    const {children} = this.props;
    return ReactDOM.createPortal(children, document.getElementById('modals'));
  }
}

class App extends Component {
  handleClick = event => {
    console.log(event.target.tagName);
  };

  render() {
    return (
      <div onClick={this.handleClick}>
        <span>Hello</span>
        {true ? (
          <ModalWindow>
            <span>modal window</span>
            <button>btn</button>
          </ModalWindow>
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));