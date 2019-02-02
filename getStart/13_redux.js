// Redux

// надкомпонентное управление состоянием
// компоненты: store, reducers, actions, action creators, react-redux, selectors, middlewares


// - store
// - API/методы
// - actions
// - actions creators
// - reducer


// start
yarn add redux

import {createStore} from 'redux';

const initialState = {};
const reducer = (state = initialState, action) => {
  if (action.type === 'SOME_ACTION') {
    const newVal = 1;
    return {...state, newVal}; // upd state
  }
  return state;
};
const store = createStore(reducer, initialState);


// в initialState удобно записывать данные из локал сторадж

// общение с сервером
window.REDUX_INITIAL_STORE = store.getState();
window.REDUX_INITIAL_STORE = {initialStateData};


// - store
// store — хранилище состояния

// createStore на вход ожидает параметры reducer, state
createStore(reducer, state);

// подписка на события стора
store.subscribe(() => {
  console.log(store.getState());
});


// - API/методы

store.dispatch(action)
// отправляет действие в store 

store.subscribe(listener)
// добавляет слушателя
 
store.getState()
// возвращает текущее состояние вашего приложения

replaceReducer(nextReducer)
// заменяет редьюсер, который в настоящее время используется хранилищем 


// subscribe() возвращает функцию для отмены регистрации слушателя
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
...
unsubscribe();


// - actions

// единственный способ изменить состояние — передать action — объект, описывающий, что произошло
// action должен быть плоским объектом, должен иметь поле type, значение которого определяется как строковая константа
// store.dispatch(action) отправляет action в хранилище
{ 
  type: 'ADD_TODO', 
} 
  
  
// может иметь св-во error, payload, meta
// meta — может иметь любое значение, не явл payload, исп для передачи служебных данных
// error — в поле error содержится описание ошибки, error — может быть установлено в true, если действие представляет ошибку
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
  
// (!) для экшенов имеет смысл выносить их названия в объект с переменными, 
// чтобы не ошибиться в написании названия экшена
const TYPES = {
  LOAD_DATA_START: 'LOAD_DATA_START',
  LOAD_DATA_END: 'LOAD_DATA_END',
  SET_LAST_ACTIVITY_TIME: 'SET_LAST_ACTIVITY_TIME'
};

  

  
// - actions creators
  
// В Redux генераторы действий (action creators) просто возвращают action (в виде объекта)
// имеет смысл исп если есть payload
function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: text
  }
}
  
  
// - reducer
  
// обработка экшенов
// редьюсеры разбиваются по полям в стейте, те для каждого поля/значения свой обработчик
// reducer — это чистая функция(!), которая принимает предыдущее состояние и действие (state и action) и возвращает следующее состояние (новую версию предыдущего)
// данные в редьюсере нельзя мутировать!
// нельзя внутри вызывать не чистые функции, напр Date.now() или Math.random(), тк они генерируют разные значения при вызове, reducer только вычисляет новую версию состояния и возвращать её
// обязательно исп дефолтное значение (state = {}, action)
// state всегда должен быть простым объектом
  
const reducer = (state = {count: 0}, action) => {
  switch(action.type) {
    case 'ADD_COMMENT':
      return {...state, count: state.count + 1};
    default:
      return state;
  }
};
  
      
// - combineReducers
// применяется combineReducers для организации редьюсеров
import {combineReducers} from 'redux';

const total = (state = [], action) => {
  return state;
};
  
const entities = (state = 0, action) => {
  return state;
};
  
const users = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.payload];
    case 'REMOVE_ALL_USERS':
      return [];
    default: 
      return state;
  }
};
  
const rootReducer = combineReducers({
  products: combineReducers({
    total,
    entities,
  }),
  users,
});

const store = createStore(rootReducer);

  
// можно делать вложение редьюсеров
// изменение action.type обрабатывается на любом уровне вложенности
const comments = (state = {count: 0, comments: []}, action) => {
  switch(action.type) {
    case 'ADD_COMMENT':
      return ({
        ...state,
        comments: [...state.comments, action.payload],
        count: state.count + 1
      });
    default: return state;
  }
};
const count = (state = 0, action) => state;
const records = (state = [], action) => state;
const users = combineReducers({
  count,
  records
});

export default combineReducers({
  comments,
  users
});
  
  
// организация кода
  
// в store.js размещается конфигурация хранилища
// в нём обычно подкл мидлвары для работы с редаксом
import {createStore, compose} from 'redux';
import rootReducer from './reducers';

export default (initialState = undefined) => {
  return createStore(
    rootReducer,
    initialState,
    compose(window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f) // << мидлвар для Redux DevTools
  );
};
  
// Redux DevTools: https://github.com/zalmoxisus/redux-devtools-extension

  
  
  
  
// dispatch with action creators
  
import {addComment} from './actions/commentsActions';

const store = createStore();

// without
/*
store.dispatch({
  type: 'ADD_COMMENT', 
  payload: 'comment text...'
});
*/

// with
store.dispatch(addComment('comment text from payload...'));

// in /actions/commentsActions.js
    import {ADD_COMMENT} from './commentsTypes';

    export const addComment = payload => ({
      type: ADD_COMMENT,
      payload
    });
// in /actions/commentsTypes.js
    export const ADD_COMMENT = 'ADD_COMMENT';
  
  
  
  
  
  
// полная структура редакс на примере (в одном файле)
import {createStore} from 'redux';
  
const initialState = {
  dataIsLoading: false,
  users: [],
  lastActivityTime: 0,
};
  
// action types
const TYPES = {
  LOAD_DATA_START: 'LOAD_DATA_START',
  LOAD_DATA_END: 'LOAD_DATA_END',
  SET_LAST_ACTIVITY_TIME: 'SET_LAST_ACTIVITY_TIME'
};
  
// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.LOAD_DATA_START:
      return {...state, dataIsLoading: true};
      
    case TYPES.LOAD_DATA_END:
      return {...state, dataIsLoading: false};
      
    case TYPES.SET_LAST_ACTIVITY_TIME:
      return {...state, lastActivityTime: action.payload};
      
    default:
      return state;
  }
};
  
// store
const store = createStore(reducer);
  
store.subscribe(() => {
  console.log(store.getState());
});
  
// action creator
const loadDataStart = () => ({
  type: TYPES.LOAD_DATA_START,
});
  
// dispatch
store.dispatch(loadDataStart());
  
// пример без экшн криэйтора
store.dispatch({
  type: TYPES.LOAD_DATA_END,
});
  
const now = new Date.getTime();
  
const setLastActivityTime = payload => ({
  type: TYPES.SET_LAST_ACTIVITY_TIME,
  payload,
});
  
store.dispatch(setLastActivityTime(now));
  