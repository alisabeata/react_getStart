import React, {Component, PureComponent} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function pureHOC(WrapperdComponent) {
  return class pureHOC extends PureComponent {
    render() {
      return <WrapperdComponent {...this.props} />;
    }
  }
}

function withWindowWidthHOC(WrapperdComponent) {
  return class WithWindowWidthHOC extends PureComponent {
    constructor(props) {
      super();

      this.state = {
        width: window.innerWidth
      };
    }

    handleResize = () => {
      this.setState({width: window.innerWidth});
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    render() {
      const {width} = this.state;
      return <WrapperdComponent {...this.props} width={width} />;
    }
  }
}

function App({greeting, width}) {
  return <h1>{greeting}{width}</h1>;
}

App.defaultProps = {
  greeting: 'Empty greeting'
};

App = pureHOC(App);
App = withWindowWidthHOC(App);

ReactDOM.render(<App greeting="hello" />, document.getElementById('root'));
