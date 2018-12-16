// module 'react-redux'
yarn add react-redux

import {Provider, connect} from 'react-redux';

// Provider предоставляет доступ к хранилищу store, передаёт приложению текущее состояние
// Provider работает через контекст
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

// connect непосредственно передаёт доступ к состоянию
// connect является hoc
let AppWithRedux = connect()(App);

ReactDOM.render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>, 
  document.getElementById('root')
);
