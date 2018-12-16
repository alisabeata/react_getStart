import React, {Component, PureComponent} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import createStore from './store';
import {addComment} from './actions/commentsActions';
import {getComments, getCommentCounts} from './reducers';
import {Provider, connect} from 'react-redux';


const store = createStore();

store.dispatch(addComment('comment text from payload...'));

store.dispatch({
  type: 'ADD_USER', 
  payload: 'Username'
});

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
        {comments.map(comment => (
          <div key={comment}>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  commentsCount: getCommentCounts(state),
  comments: getComments(state)
});

const mapDispatchToProps = {
  addComment
};

let AppWithRedux = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>,
  document.getElementById('root')
);
