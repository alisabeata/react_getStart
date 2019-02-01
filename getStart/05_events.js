// events


// https://reactjs.org/docs/events.html
// в реакте используются synthetic event

// onClick
// onContextMenu
// onDoubleClick
// onDrag
// onDragEnd
// onDragEnter
// onDragExit 
// onDragLeave
// onDragOver 
// onDragStart
// onDrop
// onMouseDown
// onMouseEnter
// onMouseLeave
// onMouseMove
// onMouseOut
// onMouseOver
// onMouseUp

handleOnChange = event => {
 this.setState({value: event.target.value});
};

render() {
 return (
   <div>
     <input value={this.state.value} onChange={this.handleOnChange} />
   </div>
 );
}


// обр события нужно в том компоненте где оно было вызвано
// передача обработчика через props от родителя
class Button extends Component {
  render () {
    const {children, onClick} = this.props;
    return <button onClick={onClick}>{children}</button>;
  }
}

class App extends Component {
  handleClick = event => {
    console.log(event);
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>Click me</Button>
      </div>
    );
  }
}

// - event bubbling
// второй способ повесить обработчик на родителя, который будет срабатывать при клике на child
class Button extends Component {
  render () {
    const {children} = this.props;
    return <button>{children}</button>;
  }
}

class App extends Component {
  handleClick = event => {
    console.log(event.target.tagName); // >>> BUTTON
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <Button>Click me</Button>
      </div>
    );
  }
}



// если нужно передать событие, и воспользоваться им в асинхронном коде, необходимо вызвать метод event.persist()
// метод event.persist сообщает реакту, что это событие не нужно очищать и переиспользовать


// - Списки и keys

// для элементов генерируемых методом map необходимо присваивать уникальный аттрибут key
render() {
  return (
    <div>
      <ul>
        {list.map(el => <li key={el.id}>{el.text}</li>)}
      </ul>
    </div>
  );
}


// запись в стейт знач инпута
state = {
  email: '',
  firstName: '',
  lastName: '',
};

handleChange = event => {
  this.setState({
    [event.target.name]: event.target.value
  });
};

render() {
  return (
    <div>
      {Object.keys(this.state).map(fieldName => (
        <input 
          key={fieldName}
          name={fieldName}
          value={this.state[fieldName]}
          placeholder={fieldName.toUpperCase()}
          onChange={this.handleChange}
        /> 
      ))}
    </div>
  );
}


// or

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


// - event.persist()
// event.persist() нужен чтобы не стиралось значение event после асинхронного вызова
handleClick = event => {
  console.log(event); // без event.persist повторный вызова после setTimeout будет недоступен
  event.persist();
  setTimeout(() => console.log(event.target), 1);
};

// - event.nativeEvent
// выводит нативный эвент вместо proxy
event.nativeEvent
