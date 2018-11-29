import React, {Component, PureComponent} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends Component {
  state = {
    data: [1, 2, 3]
  };

  handleClick = () => {
    this.setState({
        data: [...this.state.data, this.state.data.length + 1]
    });
  };

  render() {
    const {data} = this.state;
    return (
      <div>
        <button onClick={this.handleClick}>Update</button>
        <Updater data={data} />
        <Title>Title text</Title>
      </div>
    );
  }
}

function Title(props) {
  return (
    <div>
      <p className="title">{props.children}</p>
    </div>
  );
}

class Updater extends PureComponent {
  render() {
    const {data} = this.props;
    return <div>{data.map(elem => <p key={elem}>{elem}</p>)}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));