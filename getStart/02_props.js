// props


// read only
// компоненты получают данные через props
// props — это атрибуты тега компоненты

class CommentList extends Component {
  render() {
    return (
      <div>
        <Comment 
          author="Name" 
          text="Some text" 
        />
      </div>
    );
  }
}

class Comment extends Component {
  render() {
   const {author, text} = this.props; // >> 'Name', 'Some text'
   return (
     <div>
      <p>{author}</p>
      <p>{text}</p>
     </div>
   );
  }
}

// (!) когда мы используем stateless component, props передается аргументом 
const Comment = ({author, text}) => (
  <div>
    <p>{author}</p>
    <p>{text}</p>
  </div>
);

// - все события DOM дерева доступны через указание onClick (onBlur etc) как атрибута
handleClick = event => {
  event.preventDefault();
}

render() {
  return (
    <div>
      <p>{this.state.counter}</p>
      <button onClick={this.handleClick}>+</button>
    </div>
  );
}
