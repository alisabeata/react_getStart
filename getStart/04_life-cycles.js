// life cycles


// Монтирование компоненты:
// - constructor(props)
// - componentWillMount()
// - render()
// - componentDidMount()

// Обновление компоненты:
// - componentWillReceiveProps(nextProps)
// - shouldComponentUpdate(nextProps, nextState)
// - componentWillUpdate(nextProps, nextState)
// - render()
// - componentDidUpdate(prevProps, prevState)

// Удаление компоненты:
// - componentWillUnmount()

// Ошибки:
// - componentDidCatch(error, info)


// Доп методы, переменные:
// - forceUpdate()
// - defaultProps
// - displayName


// ----------------------------------

// -- constructor(props)
// вызывается монтированием компоненты к DOM
// обычно используется для инициализации state компоненты
constructor(props) {
  super(props);

  this.state = {
    arg: props.arg
  };
}

// -- componentWillMount() 
//* мало используется, функционал заменяется другими методами
// вызывается непосредственно перед монтированием и render
componentWillMount() {...}

// -- render()
// обязательная, остальные опциональны
// должна возвращать jsx, string, number, null, boolean или портал
// если возвращается boolean значение или null, то компонент не будет отрендерен
render() {
  return '<div>...</div>';
}

// -- componentDidMount()
// вызывается сразу же после вызова функции render и монтировании компонента к DOM
// вызов сетевых запросов, подключение сторинних библиотек к через обращение к DOM-элементу, интервалы, подключение листенеров (addEventListener к window)
componentDidMount() {
  fetch().then(data => {
    this.setState({isLoading: false, data: data})
  });

  $('.element').table();

  this.interval = setInterval(() => {
    this.setState({counter: this.state.counter + 1});
  }, 1000);

  window.addEventListener('resize', this.handleResize);
}


// -- componentWillReceiveProps(nextProps)
// вызывается каждый раз, когда компонент получает новые props, обычно исп для обновления значений state, которые зависят от props
componentWillReceiveProps(nextProps) {
  this.state // old walue
  nextProps // next
}

// -- shouldComponentUpdate(nextProps, nextState)
// вызывается перед функцией render, и не вызывается в самый первый раз при монтировании
// сообщает реакту, нужно ли вызывать функцию render для компоненты, когда у нее изменились её props или state, функция должна вернуть boolean (default: true)
// if return false -- componentWillUpdate, render и compoentDidUpdate не будут вызваны
shouldComponentUpdate(nextProps, nextState) {
  return this.props.products !== nextProps.products; // пример исп с условием для списка
}

// -- componentWillUpdate(nextProps, nextState)
// вызывается непосредственно перед обновлением компоненты и вызовом render
// нельзя вызывать setState, метод позволяет сделать подготовки перед обновлением
componentWillUpdate(nextProps, nextState) {
  this.isUpdate = true; // например, исп для обновления статуса внутри компонента
}
                      
// -- componentDidUpdate(prevProps, prevState)
// вызывается сразу после render
// не вызывается после первого вызова render, используется для того, чтобы изменять DOM в зависимости от props компоненты
componentDidUpdate(prevProps, prevState) {
  ...
  $('.element').setCanvas(); // напр, обновление плагина при изменении DOM
}


// -- componentWillUnmount()
// метод вызывается перед тем, как компонент отмонтируется от DOM и будет уничтожен
// в этом методе отключают eventListener, если они есть и отменяют сетевые запросы
componentWillUnmount() {
  $('.element').table().exit();
  clearInterval(this.interval);
  window.removeEventListener('resize', this.handleResize);
}

// -- componentDidCatch(error, info)
// вызывается при наличии ошибки в child-компонентах
// можно вызвать setState и отразить в ui наличие ошибки
componentDidCatch(error, info) {...} 


// - forceUpdate()
// вызов render вручную
// не стоит исп в штатном режиме

// - defaultProps
// переменная класса, для того чтобы задать props по-умолчанию

// - displayName
// переменная класса, исп при дебаггинге
