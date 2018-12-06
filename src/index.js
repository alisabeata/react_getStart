import React, {Component, PureComponent} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class WithWindowWidth extends PureComponent {
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
    const {render} = this.props;
    return render({width});
  }
}

function App({greeting, width}) {
  return <h1>{greeting}{width}</h1>;
}

App.defaultProps = {
  greeting: 'Empty greeting'
};

ReactDOM.render(
  <WithWindowWidth render={({width}) => 
    <App greeting="hello" width={width} />
  } />,
  document.getElementById('root'));
