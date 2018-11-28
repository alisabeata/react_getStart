// Props

// (!) read only

// Компоненты получают данные через props
// Props — это атрибуты тега компоненты

class CommentList extends Component {
  const comments = {...};
  ...
  return <div><Comment author={comment.author} text={comment.text} /></div>;
}

class Comment extends Component {
  render() {
   const {author, text} = props;
   return <div><p>{author}</p><p>{text}</p></div>;
  }
}

// В случае, когда мы используем функцию, а не класс, props передается аргументом функции 
function Comment(props) {
 const {author, text} = this.props;
 return <div><p>{author}</p><p>{text}</p></div>;
}

// shortest way 
const Comment = ({author, text}) => <div><p>{author}</p><p>{text}</p></div>;
