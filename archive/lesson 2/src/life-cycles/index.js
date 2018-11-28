import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends Component {
  state = {
    counter: 0
  }
  constructor(props) {
    super(props);
    console.log('constructor');
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
    
    this.intervalId = setInterval(() => {
      this.setState(state => ({counter: state.counter + 1}))
    }, 10000);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    clearInterval(this.intervalId);
  }

  componentDidCatch(error, info) {
    console.log('componentDidCatch');
  }

  handleClick = () => {
    this.setState(state => ({counter: state.counter + 1}));
  }

  render() {
    console.log('render');
    const {counter} = this.state;
    
    return (
      <div>
        <button onClick={this.handleClick}>count++</button>
        <UpdateComponent counter={counter} />
      </div>
    );
  }
}

class UpdateComponent extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    // this.props // old walue
    // nextProps // next
  }

  shouldComponentUpdate(nextProps, nextState) {
    //return this.props.products !== nextProps.products;
    console.log('shouldComponentUpdate');
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    //this.isUpdate = true;
    console.log('componentWillUpdate');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }

  render() {
    console.log('upd render');
    const {counter} = this.props;
    return <p>{counter}</p>;
  }
}

ReactDOM.render(<App arg={1} />, document.getElementById('root'));