// Higher-Order Components (HOC)

// https://reactjs.org/docs/higher-order-components.html

// компонент, который принимает компонент и возвращает компонент
// аналогично higher order functions функциям высшего порядка


function pureHOC(wrapperdComponent) {
  return class pureHOC extends PureComponent {
    render() {
      return React.createElement(wrapperdComponent, this.props);
    }
  }
}

function App({greeting}) {
  return <h1>{greeting}</h1>;
}

App.defaultProps = {
  greeting: 'Empty greeting'
};

App = pureHOC(App);

ReactDOM.render(<App greeting="hello" />, document.getElementById('root'));


// with jsx
function pureHOC(WrapperdComponent) {
  return class pureHOC extends PureComponent {
    render() {
      return <WrapperdComponent {...this.props} />
    }
  }
}



// get width with HOC
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
      return <WrapperdComponent {...this.props} width={width} />
    }
  }
}

function App({width}) {
  return <h1>{width}</h1>;
}

App = withWindowWidthHOC(App);


// каррирование в hoc
connect(state => ({user: state.user}))(App)

function App({width, user}) {... // user передаётся через hoc (connect)
// connect метод Redux

compose(fn, fn1, fn2)(x)
// compose()() метод Recompose
// Recompose — это библиотека с уже готовыми компонентами высшего порядка
// https://github.com/acdlite/recompose




// - render props
// передача метода render компоненты
class WithWindowWidth extends Component {
  state = {
    width: window.innerWidth
  };

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
    return this.props.render(width);
  }
}

export default () => (
  <div>
    <p>ширина окна:</p>
    <WithWindowWidth render={width => (<span>{width}</span>)} />
  </div>
);
