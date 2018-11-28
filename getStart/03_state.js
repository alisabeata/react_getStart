// State

// init

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

  render() {
    ...
  }
}

// в state доступна обработка пропсов (с учётом иммутабельности), чтобы не переносить логику в рендер (рендер происходит при каждом обновлении компонента)

// constructor выполняется до рендера, вызывается один раз при монтировке компонентов



// - обновление state

// -- передча параметра
this.setState({inputValue: val});

// -- обновление state функцией
... () => {
  function updateState(state) {
    return {
      inputValue: val,
      counter: state.counter + 1
    }
  }
  this.setState(updateState);
};



// - (важно!) иммутабельность при передачи параметров
... () => {
  const {inputValue, todos} = this.state;
  const newTodo = {id: getTodoId(), value: inputValue, done: false};
  this.setState({inputValue: '', todos: [...todos, newTodo]}); // <<<
};