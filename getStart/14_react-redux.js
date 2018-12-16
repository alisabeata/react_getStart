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

// connect при первом вызове ожидает два аргумента mapStateToProps, mapDispatchToProps
let AppWithRedux = connect(mapStateToProps, mapDispatchToProps)(App);

// mapStateToProps берёт сосстояние стейта передаёт в пропс компонента
// state -- глобальный state редакса
const mapStateToProps = state => ({
  count: state.comments.count
});

// mapDispatchToProps представл собой объект, передаёт акшены, диспатч
const mapDispatchToProps = {
  addComment
};


class App extends PureComponent {
  componentDidMount() {
    const {addComment} = this.props; // <<< from mapDispatchToProps

    addComment('add comment from App');
  }

  render() {
    console.log(this.props)
    return (
      <div>App content</div>
    );
  }
}


// селекторы исп для вызова редьюсеров без указания путей
// по соглашению именуются начигая с const get...

// in reducers/index.js
    ...
    export const getCommentCounts = state => state.comments.count;

// in index.js
    ...
    import {getCommentCounts} from './reducers';
    ... 
    const mapStateToProps = state => ({
      commentsCount: getCommentCounts(state) // <<< instead state.comments.count
    });


// result: реализован вывод комментариев
class App extends PureComponent {
  render() {
    const {comments} = this.props;
    console.log(this.props)
    return (
      <div>
        {comments.map(comment => (
          <div key={comment}>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    );
  }
};