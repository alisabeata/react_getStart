// Recompose


yarn add recompose


// https://github.com/acdlite/recompose

compose(fn, fn1, fn2)(x)

// библиотека с уже готовыми компонентами высшего порядка
// для работы с HOC
// используется для добавления функциональности Component/PureComponent к стейтлесс компонентам


import {compose, pure} from 'recompose';

const App = () => (
  <div>...</div>
);

const enchance = compose(
  pure
);

export default enchance(App);



// пример со счётчиком
import {withState, withHandlers, compose, pure} from 'recompose';

const App = ({count, increment, decrement, reset}) => (
  <div>
    <p>Counter: {count}</p>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
    <button onClick={reset}>reset</button>
  </div>
);

// значит вызвать App как PureComponent со стейтом и значениями в нём ('count'...)
const enchance = compose(
  withState('count', 'setCount', 0), // в параметрах передаются переменные
  withHandlers({
    increment: ({setCount}) => () => setCount(n => n + 1),
    decrement: ({setCount}) => () => setCount(n => n - 1),
    reset: ({setCount}) => () => setCount(n => 0)
  }),
  pure
);

export default enchance(App);


// - withState
withState('count', 'setCount', 0)

// 'count' -- название переменной
// 'setCount' -- функция которая принимает значение
// 0 -- значение по умолчанию

// чтобы добавить несколько значений в стейт исп несколько withState подряд


// - branch
// рендер компонент с условием
import {branch} from 'recompose';

const enchance = compose(
  branch(({isLoading}) => isLoading, () => <p>Loading...</p>)
);
  
  
// можно исп с додкл модулями
const enchance = compose(
  connect(state => ({}), {}),
  withRouter,
  reduxForm
);  


// - lifecycle
// работает с жизненными циклами компоненты
import {lifecycle} from 'recompose';

const enchance = compose(
  lifecycle({
    componentDidMount() {
      ...
    }
  })
);


// - onlyUpdateForKeys
// указывает на какие изменения пропс нужно реагировать
import {onlyUpdateForKeys} from 'recompose';

const enchance = compose(
  onlyUpdateForKeys(['isLoading', 'count'])
);


// - withReducer
// принимает стейт и экшн и возвращает стейт (третий параметр)
import {withReducer} from 'recompose';

const enchance = compose(
  withReducer('name', 'changeName', (state, action) => state, initialState)
);
