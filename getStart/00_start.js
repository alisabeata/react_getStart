// start


yarn create react-app my-app


// (!) в react важно использовать иммутабельные данные


import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return <div />;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
  
  
// основные концепции
// - JSX
// - Virtual DOM
// - Компоненты

// основные способы передачи данных
// - state (внутреннее состояние)
// - props (аргументы компоненты)

  
// для props рекомендуется объявл переменные в рендере
render() {
  const {color, data} = this.props; // <<
  return (
    <div>
      <FirstChild color={color} data={data} />
    </div>
  );
}

// - в JSX можно исп тэг <Fragment> для рендера дочерних нод, без оборачивания в родительский див (тк рендер должен возвращать одну ноду)
import React, {Fragment, Component} from 'react';
render() {
  return (
    <Fragment>
      <span></span>
      <p></p>
    </Fragment>
  );
}

  
// Можно исп Component или PureComponent, а так же обычные функции (в этом случае нет state)
// PureComponent предпочтительно для регулярного использования, разница закл. в особенностях исп shouldComponentUpdate
// если props остались прежними, компонента не будет заново создавать свой virtual dom слепок, и реакт будет использовать прежний слепок. 
// https://medium.com/frontend-notes/purecomponent-%D0%B8-components-5c15cf206ba7

  
// пример компоненты
class Time extends Component {
  render() {
    const nowDate = new Date().toString();

    return (
      <div>
        <p className="test">{1 + 1}</p>
        <p>{nowDate}</p>
        <ul>
          {list.map(el => <li key={el}>{el}</li>)}
        </ul>
        <Greeting />
        <Button />
      </div>
    );
  }
}


// - условия в скобочных группах jsx
{condition && <span>Rendered when truthy</span>}
{condition && <SomeComponent />}

// в jsx доступен только тернарный оператор

// - перечесление св-в в jsx
<ul>
  {items.map((item, ind) => (
    <li key={ind}>{item.title}</li>
  ))}
</ul>



// (!) если super вызывается с props, то внутри конструктора доступно this.props
constructor(props) {
  super();
  super(props);
}


// (пример) url request
constructor(props) {
  super();
  this.state = {
    isLoading: true,
    data: []
  }
}

componentDidMount() {
  fetch().then(data => {
    this.setState({isLoading: false, data: data})
  });
}

render() {
  const {isLoading, data} = this.state;
  if (isLoading) return <p>Loading...</p>;
  return <div>{data}</div>;
}


// (пример) если запрос в процессе обработки, а компонента отмонтирвана (пользователь нажал активировал др компонент), то фиксится так
constructor(props) {
  ...
  this._isMounted = false;
}

componentDidMount() {
  this._isMounted = true;
  fetch().then(data => {
    if (this._isMounted) {
      this.setState({isLoading: false, data: data})
    }
  });
}

componentWillUnmount() {
  this._isMounted = false;
}



// (пример) обработка ошибок у child-компонентов
state = {
  error: null,
  errorInfo: null
}

componentDidCatch(error, info) {
  this.setState({
    error,
    errorInfo
  });
}

// (пример) parent render
render() {
  if (counter === 3) {
    throw new Error('error!');
  }
  
  return <div>{counter}</div>;
}

// (пример) child render
render() {
  const {counter, error} = this.state;
  
  if (error) {
    return <p>{String(error.text)}</p>;
  } else {
    return <div>{counter}</div>;
  }
}

  
  
// (пример) создание темплейта, передача children узла
render() {
  return (
    <div>
      <Title>Title text</Title>
    </div>
  );
}
  
function Title(props) {
  // >> <p className="title">Title text</p>
  return (
    <div>
      <p className="title">{props.children}</p> 
    </div>
  );
}
  
// (пример) для нескольких children исп React.Children.map, map Array не подходит, тк может быть одно значение, которое не будет являться массивом 
function Title(props) {
  return (
    <div>
      <p className="title">{React.Children.map(props.children, el => <span key={el}>{el}</span>)}</p> 
    </div>
  );
}
  