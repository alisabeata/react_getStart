import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Child1 extends Component {
  render () {
    const {children, onClick} = this.props;
    return <button onClick={onClick}>{children}</button>;
  }
}

class Child2 extends Component {
  render () {
    const {children, onClick} = this.props;
    return <button onClick={onClick}>{children}</button>;
  }
}

class App extends Component {
  state = {
    counter1: 0,
    counter2: 0
  };

  handleClick = event => {
    console.log(event.target.tagName);
  }

  handleClick1 = () => {
    this.setState({counter1: this.state.counter1 + 1});
  }

  handleClick2 = () => {
    this.setState({counter2: this.state.counter2 + 1});
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <Child1 onClick={this.handleClick2}>{this.state.counter1}</Child1>
        <Child2 onClick={this.handleClick1}>{this.state.counter2}</Child2>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));