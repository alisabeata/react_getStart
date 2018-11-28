// lifecycle


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

// -- componentWillMount() 
//* мало используется, функционал заменяется другими методами
// вызывается непосредственно перед монтированием и render

// -- render()
// обязательная, остальные опциональны
// должна возвращать jsx, string, number, null, boolean или портал
// если возвращается boolean значение или null, то компонент не будет отрендерен

// -- componentDidMount()
// вызывается сразу же после вызова функции render и монтировании компонента к DOM


// -- componentWillReceiveProps(nextProps)
// вызывается каждый раз, когда компонент получает новые props, обычно исп для обновления значений state, которые зависят от props

// -- shouldComponentUpdate(nextProps, nextState)
// вызывается перед функцией render, и не вызывается в самый первый раз при монтировании
// сообщает реакту, нужно ли вызывать функцию render для компоненты, когда у нее изменились её props или state, функция должна вернуть boolean (default: true)
// if return false -- componentWillUpdate, render и compoentDidUpdate не будут вызваны

// -- componentWillUpdate(nextProps, nextState)
// вызывается непосредственно перед обновлением компоненты и вызовом render
// нельзя вызывать setState, метод позволяет сделать подготовки перед обновлением

// -- componentDidUpdate(prevProps, prevState)
// вызывается сразу после render
// не вызывается после первого вызова render, используется для того, чтобы изменять DOM в зависимости от props компоненты


// -- componentWillUnmount()
// метод вызывается перед тем, как компонент отмонтируется от DOM и будет уничтожен
// в этом методе отключают eventListener, если они есть и отменяют сетевые запросы


// -- componentDidCatch(error, info)
// вызывается при наличии ошибки в child-компонентах
// можно вызвать setState и отразить в ui наличие ошибки



// - forceUpdate()
// вызов render вручную
// не стоит исп в штатном режиме

// - defaultProps
// переменная класса, для того чтобы задать props по-умолчанию

// - displayName
// переменная класса, исп при дебаггинге
