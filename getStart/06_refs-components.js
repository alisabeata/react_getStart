// Связь компонент

// - от parent к child
// -- props
// -- children
// -- ref (React.createref())

// - от child к parent
// -- callback

// - между siblings
// -- by parent

// -------------------------

// от parent к child

// -- props
// основной способ
class Button extends Component {
  render () {
    const {children} = this.props;
    return <button className="button">{children}</button>;
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Button>Click me</Button>
      </div>
    );
  }
}

// -- children
// передача внутренних узлов (приходят в виде массива или одиночного элемента)
// >>> <button class="button">Click me</button>
function Button({children}) {
  return <button className="button">{children}</button>;
}

class App extends Component {
  render() {
    return (
      <div>
        <Button>Click me</Button>
      </div>
    );
  }
}

// -- ref
// способ получения ссылки на объект в реальном DOM или на экземпляр компонента, ref является вспомогательным решением
// стоит исп для установки фокуса на элемент, манипуляцией с video, audio тегами, возова анимации привязанной к координатам, когда нужно взамодействовать с др библиотеками
// вызывается после componentDidMount child-компонента, но до componentDidMount parent

// экземпляр класса Button
class Button extends Component {
  render () {
    const {children} = this.props;
    return <button className="button">{children}</button>;
  }
}

class App extends Component {
  componentDidMount() {
    console.log(this.button); // выводит экземпляр класса Button
  }

  render() {
    return (
      <div>
        <Button ref={c => (this.button = c)}>Click me</Button>
      </div>
    );
  }
}


// setStateFromParent
class Button extends Component {
  state = {
    color: 'red'
  };

  setStateFromParent = color => {
    this.setState({color});
  };

  render () {
    const {children} = this.props;
    const {color} = this.state;
    return <button style={{backgroundColor: color}}>{children}</button>;
  }
}

class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.button.setStateFromParent('magenta'); // <<<
    }, 1000);
  }

  render() {
    return (
      <div>
        <Button ref={c => (this.button = c)}>Click me</Button>
      </div>
    );
  }
}



// - ref для работы с DOM
// (например для video, audio)
// https://learn-reactjs.ru/core/refs-and-the-dom

// (old method)
class App extends Component {
  componentDidMount() {
    console.log(this.div) // >> <div></div>
    this.div.style = ...;
  }

  render() {
    return (
      <div ref={c => (this.div = c)}></div>
    );
  }
}

// (new) with React.createref()
class App extends Component {
  div = React.createRef();

  componentDidMount() {
    console.log(this.div) // >> <div></div>
    this.div.style = ...;
  }

  render() {
    return (
      <div ref={this.div}></div>
    );
  }
}


// от child к parent
// onClick (другие события), event bubbling
// см. 05_jsx-event-lists.js

class Parent extends Component {
  state = {
    isChecked: false,
  }
  
  handleCheckbox = (event) => {
    const isChecked = !!event.target.checked

    this.setState(state => ({
      ...state,
      isChecked,
    }))
  }
  render () {
    return <Children handleCheckbox={this.handleCheckbox} />
  }
}
                  
class Children extends Component {
  render () {
    return <input onChange={handleCheckbox} />
  }
}


// между siblings
// взаимодействие идёт через parent
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

  handleClick1 = () => {
    this.setState({counter1: this.state.counter1 + 1});
  }

  handleClick2 = () => {
    this.setState({counter2: this.state.counter2 + 1});
  }

  render() {
    return (
      <div>
        <Child1 onClick={this.handleClick2}>{this.state.counter1}</Child1>
        <Child2 onClick={this.handleClick1}>{this.state.counter2}</Child2>
      </div>
    );
  }
}
