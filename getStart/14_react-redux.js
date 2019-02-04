// react-redux

yarn add react-redux

import {Provider, connect} from 'react-redux';


// - Provider предоставляет доступ к хранилищу store, передаёт приложению текущее состояние
// Provider работает через контекст
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);


// - connect непосредственно передаёт доступ к состоянию, делая доступным метод
// dispatch для всех вложенных компонентов props.dispatch()
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
// mapStateToProps должен быть функцией
// state — глобальный state редакса
// можно выбрать необходимые компоненту поля из глобального стейта
const mapStateToProps = state => ({
  count: state.comments.count
});

// mapDispatchToProps представл собой объект, передаёт акшены, диспатч
// те добавляет конкретную функц как метод props
// из компонента функция вызывается как this.props.fnName()
// передаёт экшен криэйторы необходимые компоненту
const mapDispatchToProps = {
  addUsers,
  removeAllUsers,
};

// расширенный синтаксис (don't use)
const mapDispatchToProps = {
  addUsers: (id, name) => dispatch(addUser(id, name)),
  removeAllUsers: () => dispatch(removeAllUsers()),
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

// доп логику каcающеюся получения данных рекомендуется выносить в селекторы, прим
// in reducers/index.js
    ...
    export const getComments = state => state.comments.comments;
    export const getFirst10Comments = state => state.comments.comments.slice(0, 10);



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


// add comments
class App extends PureComponent {
  state = {
    commentBody: ''
  };

  handleChangeComment = event => {
    this.setState({commentBody: event.target.value})
  }

  handleKeyDown = event => {
    const {addComment} = this.props;
    const {commentBody} = this.state;

    if (event.keyCode === 13) {
      addComment(commentBody);
      this.setState({commentBody: ''});
    }
  }

  render() {
    const {comments} = this.props;
    console.log(this.props)
    return (
      <div>
        <input 
          value={this.state.commentBody}
          onChange={this.handleChangeComment}
          onKeyDown={this.handleKeyDown} 
        />
        {comments.map((comment, i) => (
          <div key={[comment, i].join('_')}>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    );
  }
}
