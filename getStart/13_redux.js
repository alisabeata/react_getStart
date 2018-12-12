// Redux

// надкомпонентное управление состоянием


// - API/методы
// - actions
// - actions creators
// - reducers
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


// - actions

// единственный способ изменить состояние — передать action — объект, описывающий, что произошло

// action должен быть плоским объектом, должен иметь поле type, значение которого определяется как строковая константа
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
  
  
// - reducers
  
// reducer — это чистая функция(!), которая принимает предыдущее состояние и действие (state и action) и возвращает следующее состояние (новую версию предыдущего)
// данные в редьюсере нельзя мутировать!
  
  
  
// - store
