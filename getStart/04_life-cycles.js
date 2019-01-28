// life cycles


// монтирование компоненты
// - constructor(props)
// - (new) static getDerivedStateFromPops() // с 16 версии
// - (old) componentWillMount()
// - render()
// - componentDidMount()

// обновление
// - (new) static getDerivedStateFromPops() // с 16 версии
// - (old) componentWillReceiveProps(nextProps)
// - shouldComponentUpdate(nextProps, nextState)
// - (old) componentWillUpdate(nextProps, nextState)
// - render()
// - (new) getSnapshotBeforeUpdate() // с 16 версии
// - componentDidUpdate(prevProps, prevState)

// удаление (unmounting)
// - componentWillUnmount()

// ошибки
// - componentDidCatch(error, info)

// доп методы, переменные
// - forceUpdate()
// - defaultProps
// - displayName


// (!) componentWillUpdate, componentWillMount, componentWillReceiveProps в 17 версии будут деприкейтед, не рекомендуется использовать


// - constructor(props)
// вызывается монтированием компоненты к DOM
// обычно используется для инициализации state компоненты
// в новом синтаксисе можно пропускать и инициализировать стейт как переменную внутри класса
constructor(props) {
  super(props);

  this.state = {
    arg: props.arg
  };
}

// - (new) static getDerivedStateFromPops()
// нужен для пердварительных вычислений от пропсов, с последующей передачей значения в стейт
// static говорит о том, что this.state/this.setState не доступны из метода
static getDerivedStateFromPops()

// - (old) componentWillMount() 
//* мало используется, функционал заменяется другими методами
// вызывается непосредственно перед монтированием и render
componentWillMount()

// - render()
// обязательная, остальные опциональны
// должна возвращать jsx, string, number, null, boolean или портал
// если возвращается boolean значение или null, то компонент не будет отрендерен
render() {
  return '<div>...</div>';
}

// - componentDidMount()
// вызывается сразу же после вызова функции render и монтировании компонента к DOM
// вызов сетевых запросов, подключение сторонних библиотек к через обращение к DOM-элементу, интервалы, подключение листенеров (addEventListener к window), видеоплееров
// componentDidMount не вызывается при сервер-сайд рендеринге
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


// - (old) componentWillReceiveProps(nextProps)
// вызывается каждый раз, когда компонент получает новые props, обычно исп для обновления значений state, которые зависят от props
componentWillReceiveProps(nextProps) {
  this.state // old walue
  nextProps // next
}

// - shouldComponentUpdate(nextProps, nextState)
// вызывается перед функцией render, и не вызывается в самый первый раз при монтировании
// сообщает реакту, нужно ли вызывать функцию render для компоненты, когда у нее изменились её props или state, функция должна вернуть boolean (default: true)
// if return false — componentWillUpdate, render и compoentDidUpdate не будут вызваны
shouldComponentUpdate(nextProps, nextState) {
  return this.props.products !== nextProps.products; // пример исп с условием для списка
}

// - (old) componentWillUpdate(nextProps, nextState)
// вызывается непосредственно перед обновлением компоненты и вызовом render
// нельзя вызывать setState, метод позволяет сделать подготовки перед обновлением
componentWillUpdate(nextProps, nextState) {
  this.isUpdate = true; // например, исп для обновления статуса внутри компонента
}

// - (new) getSnapshotBeforeUpdate()
// вызывается непоср перед ререндером, можно получить данные от DOM
// нужен в основном для работы с DOM
getSnapshotBeforeUpdate()
                      
// - componentDidUpdate(prevProps, prevState)
// вызывается сразу после render
// не вызывается после первого вызова render, используется для того, чтобы изменять DOM в зависимости от props компоненты
componentDidUpdate(prevProps, prevState) {
  ...
  $('.element').setCanvas(); // напр, обновление плагина при изменении DOM
}


// - componentWillUnmount()
// метод вызывается перед тем, как компонент отмонтируется от DOM и будет уничтожен
// в этом методе отключают eventListener, если они есть и отменяют сетевые запросы
componentWillUnmount() {
  $('.element').table().exit();
  clearInterval(this.interval);
  window.removeEventListener('resize', this.handleResize);
}

// - componentDidCatch(error, info)
// нужен для того чтобы ловить ошибки рендера
// отлавливает только ошибки child-компонент
// можно вызвать setState и отразить в ui наличие ошибки
componentDidCatch(error, info) {...}



// - forceUpdate()
// вызов render вручную
// не стоит исп в штатном режиме

// - defaultProps
// переменная класса, для того чтобы задать props по-умолчанию

// - displayName
// переменная класса, исп при дебаггинге
