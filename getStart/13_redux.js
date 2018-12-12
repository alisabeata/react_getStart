// Redux

// надкомпонентное управление состоянием


// - API/методы
// - action
// - actions creators
// - reducer
// - store

// start
yarn add redux

import {createStore} from 'redux';

const reducer = (state = {}, action) => ({test: 'test'});
const store = createStore(reducer, {});


// createStore на вход ожидает параметры reducer, state
createStore(reducer, state);


// - API/методы

store.dispatch(action)
// отправляет действие в store 

store.subscribe(listener)
// добавляет слушателя
 
store.getState()
// возвращает текущее состояние вашего приложения

replaceReducer(nextReducer)
// заменяет редьюсер, который в настоящее время используется хранилищем 



// - action

// единственный способ изменить состояние — передать action — объект, описывающий, что произошло
// action должен быть плоским объектом, должен иметь поле type, значение которого определяется как строковая константа
// store.dispatch(action) отправляет action в хранилище
{ 
  type: 'ADD_TODO', 
} 
  
  
// может иметь св-во error, payload, meta
  
// error — может быть установлено в true, если действие представляет ошибку
// payload — свойство полезной нагрузки (payload) может иметь любое значение
{
  type: 'ADD_TODO',
  payload: 'Todo title text',
}
  
{
  type: 'ADD_TODO',
  payload: {
	text: 'Todo title text',
	date: '15/11/2017',
  }
}
// meta — может иметь любое значение, не явл payload
  

  
// - actions creators
  
// В Redux генераторы действий (action creators) просто возвращают action
function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: text
  }
}
  
  
// - reducer
  
// reducer — это чистая функция(!), которая принимает предыдущее состояние и действие (state и action) и возвращает следующее состояние (новую версию предыдущего)
// данные в редьюсере нельзя мутировать!
// нельзя внутри вызывать не чистые функции, напр Date.now() или Math.random(), тк они генерируют разные значения при вызове, reducer только вычисляет новую версию состояния и возвращать её
  
const reducer = (state = {count: 0}, action) => {
  switch(action.type) {
    case 'ADD_COMMENT':
      return {...state, count: state.count + 1};
    default:
      return state;
  }
};

const store = createStore(reducer);
const action = {
  type: 'ADD_COMMENT'
};

store.dispatch(action);
console.log(store.getState()); // >> {count: 1}
  
  
// - store
