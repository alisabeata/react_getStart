// context

// https://reactjs.org/docs/context.html


// React.creatContext() в параметре ожидает дефолтное значение контекста
//  возвращает объект с двумя параметрами Provider, Consumer
// Provider отправляет значения
// Consumer принимает значения
const {Provider, Consumer} = React.createContext('light');
// or
const MyContext = React.createContext('light');
// доступ MyContext.Provider / MyContext.Consumer

class ContextApi extends Component {
  state = {
    theme: 'light'
  };

  componentDidMount() {
    // раз в минуту меняет тему со светлой на тёмную
    setInterval(() => this.setState(state => state.theme === 'light' ? {theme: 'dark'} : {theme: 'light'}), 1000);
  }

  render() {
    return (
      <Provider value="{this.state.theme}">
        <IntermediateComponent>
          <IntermediateComponent>
            <IntermediateComponent>
              <Button />
            </IntermediateComponent>
          </IntermediateComponent>
        </IntermediateComponent>
      </Provider>
    );
  }
}

const IntermediateComponent = ({children}) => <div>{children}</div>;

// Consumer будет получать значение value провайдера через любую вложенность компонент
const Button = () => (
  <Consumer>
    {value => (
      <button style="{{backgroundColor: value === 'light' ? '#eee' : '#ccc'}}"></button> 
    )}
  </Consumer>
);
// имеет значение исп при большой вложенности



// (old)

// в большинстве случаев не рекомендован к использованию, тем не менее 
// с помощью контекста работают библиотеки, связывающие react и redux, 
// react-router, redux-form, все библиотеки которым необходимо 
// интегрировать свою логику в компоненты


// способ передачи свойства всем потомкам без context
class SecondChild extends Component {
  render() {
    return (
      <p style={{color: this.props.color}}>2</p>
    );
  }
}

class FirstChild extends Component {
  render() {
    return (
      <div>
        <span style={{color: this.props.color}}>1</span>
        <SecondChild color={this.props.color} />
      </div>
    );
  }
}

class App extends Component {
  state = {
    color: 'red'
  };

  render() {
    return (
      <div>
        <FirstChild color={this.state.color} />
      </div>
    );
  }
}


// с context

// (!) для работы с контекстом необходимо исп PropTypes

import PropTypes from 'prop-types';

class SecondChild extends Component {
  static contextTypes = {
    color: PropTypes.string
  };

  render() {
    return (
      <p style={{color: this.context.color}}>2</p> // >> blue
    );
  }
}

class FirstChild extends Component {
  render() {
    return (
      <div>
        <span>1</span>
        <SecondChild />
      </div>
    );
  }
}

class App extends Component {
  static childContextTypes = {
    color: PropTypes.string
  };

  getChildContext() {
    return {color: 'blue'};
  }

  render() {
    return (
      <div>
        <FirstChild />
      </div>
    );
  }
}


// при использовании pureComponent или компонент с переопределённым 
// shouldComponentUpdate возникают проблемы с обновлением контекста

// getChildContext вызывается после render перед componentDidMount


// подписка на обновление стора (прим. механизма)
class SecondChild extends Component {
  static contextTypes = {
    store: PropTypes.object,
    addListener: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      store: this.context.store;
    };
    this.context.addListener(this.handleUpdateStore)
  }

  render() {
    console.log(this.context)
    return (
      <p style={{color: this.context.color}}>2</p>
    );
  }
}

class FirstChild extends Component {
  render() {
    return (
      <div>
        <span>1</span>
        <SecondChild />
      </div>
    );
  }
}

class App extends Component {
  static childContextTypes = {
    store: PropTypes.object,
    addListener: PropTypes.func
  };

  // глобальный объект
  store = {
    firstName: 'Alice',
    secondName: 'Doe'
  };

  store.onUpdate({
    listeners.forEach(listner => listner(nextStore))
  });

  getChildContext() {
    return {store, addListener};
  }

  render() {
    return (
      <div>
        <FirstChild />
      </div>
    );
  }
}
