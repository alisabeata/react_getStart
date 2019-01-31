// Higher-Order Components (HOC)

// https://reactjs.org/docs/higher-order-components.html

// компонент, который принимает компонент и возвращает компонент
// аналогично higher order functions функциям высшего порядка

const Stateless = () => {
  return <p>stateless component</p>;
};

function pureHOC(wrappedComponent) {
  return (
    class pureHOC extends PureComponent {
      static displayName = 'PureHOC'; // нужно для отображения имени компоненты в реакт дев тулз
      render() {
        return <wrappedComponent {...this.props} />;
      }
    }
  );
}

const PureStateless = pureHOC(Stateless);

// (из примера) полезно для добавления функциональности к стейтлес компонентам (что экономит код)
// pureHOC при подключении выносится в отдельный модуль
import pureHOC



// get width with HOC
function withWindowWidthHOC(wrappedComponent) {
  return class WithWindowWidthHOC extends PureComponent {
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
      return <wrappedComponent {...this.props} width={width} />
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

// применимо при выводе функционала компоненты на уровень выше, для передачи вычисляемых значений

// render props заменяет функциональность hoc

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
