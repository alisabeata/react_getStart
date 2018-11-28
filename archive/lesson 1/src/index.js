import React, {Component, PureComponent} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';

/*
//import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();

const list = [1, 2, 3, 4, 5];

// with state
// PureComponent  предпочтительно для регулярного использования
class Greeting extends PureComponent {
  render() {
    return <div />;
  }
}

// whithout state
const Button = ({props}) => <button>{props ? props.title : 'click'}</button>;

class Time extends Component {
  render() {
    const nowDate = new Date().toString();

    return (
      <div>
        <p className="test">{1 + 1}</p>
        <p>{nowDate}</p>
        <ul>
          {list.map(el => <li key={el}>{el}</li>)}
        </ul>
        <Greeting />
        <Button />
      </div>
    );
  }
}

ReactDOM.render(<Time />, document.getElementById('root'));
*/

let id = 0;

function getTodoId() {
  id += 1;
  return id;
}

class App extends PureComponent {
  state = {
    inputValue: '',
    counter: 0,
    todos: [
      {
        id: 0,
        value: 'test',
        done: false
      }
    ]
  };

  handleChange = event => {
    const val = event.target.value;

    this.setState({inputValue: val});
    // обновление state функцией
    /*
    function updateState(state) {
      return {
        inputValue: val,
        counter: state.counter + 1
      }
    }
    this.setState(updateState);
    */
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      const {inputValue, todos} = this.state;
      const newTodo = {id: getTodoId(), value: inputValue, done: false};
      this.setState({inputValue: '', todos: [...todos, newTodo]});
    }
  };

  handleClickCheckbox = id => {
    this.setState(state => ({
      todos: state.todos.map(
        todo => id === todo.id ? {...todo, done: !todo.done} : todo
      )
    }));
  };

  handleDelete = id => {
    this.setState(state => ({
      todos: state.todos.filter(todo => id !== todo.id)
    }));
  };

  render() {
    const {inputValue, todos} = this.state;
    return (
      <div className="container">
        <input 
          value={inputValue} 
          onChange={this.handleChange} 
          onKeyDown={this.handleKeyDown}
        />
        <div>
          {todos.map(todo => (
            <Todo 
              onChange={this.handleClickCheckbox} 
              onDelete={this.handleDelete}
              key={todo.id} 
              id={todo.id}
              text={todo.value} 
              done={todo.done} 
            />))}
        </div>
      </div>
    );
  }
}

class Todo extends PureComponent {
  handleChange = () => {
    const {id, onChange} = this.props;
    onChange(id);
  };

  handleDelete = () => {
    const {id, onDelete} = this.props;
    onDelete(id);
  };

  render() {
    const {text, done} = this.props;

    return (
      <div>
        <input 
          type="checkbox" 
          checked={done} 
          onChange={this.handleChange}
        />
        <span className={done ? 'line-through' : ''}>{text}</span>
        <span 
          onClick={this.handleDelete}
          className="delete-icon"
        >x</span>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));