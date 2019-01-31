// state


// хранилище данных компоненты

// в state доступна обработка props (с учётом иммутабельности), чтобы не переносить логику в рендер (рендер происходит при каждом обновлении компонента)

class App extends Component {
  state = {
    counter: 0
  }
  
  handleClick = event => {
    this.setState(state => ({
      counter: state.counter + 1
    }));
  }
  
  render() {
    return (
      <div>
        <p>{this.state.counter}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}


// - обновление state

// существует два способа
// обновление с помощью функции (более предпочтительный, тк при обновлении происходит накопление изменений в стейте, может вызывть проблемы при обновлении параметром вызовом setState подряд, тк setState работает ассинхронно)
handleClick = event => {
  this.setState(state => ({
    counter: state.counter + 1
  }));
}
// передача объекта
handleClick = event => {
  this.setState({
    counter: this.state.counter + 1
  });
}

// (!) this.setState() при работе с сетью (fetch) можно использовать только когда компонента примонтирована (в componentDidMount)

// (важно!) иммутабельность при передачи параметров
const newTodo = {id: 11, value: 'val', done: false};
this.setState({todos: [...this.state.todos, newTodo]});


 
// (history) способы инициализации стейта

// constructor выполняется до рендера, вызывается один раз при монтировке компонентов

class App extends Component {
  // with constructor (old style)
  constructor(props) {
    super(props);

    this.state = {
      arg: props.arg
    };
  }

  // with getInitialState
  getInitialState () {
    return {arg: this.props.arg}
  }

  // new init style
  state = {
    arg: this.props.arg
  }

  render() {}
}



// state с вложенными значениями
state = {
  inputs: {
    email: '',
    firstName: '',
    lastName: '',
  }
};

handleChange = event => {
  const {name, value} = event.target;
  
  this.setState(state => ({
    inputs: {
      ...state.inputs,
      [name]: value
    }
  }));
};
