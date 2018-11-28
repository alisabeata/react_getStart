//start
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  return (<div>...</div>);
}

ReactDOM.render(<App />, document.getElementById('root'));
  
// основные концепции
// - Virtual DOM
// - Компонентная разработка
// - JSX
  
// (!) важно использовать иммутабельные данные

  
// Можно исп Component или PureComponent, а так же обычные функции (в этом случае нет state)
// PureComponent предпочтительно для регулярного использования, разница закл. в особенностях исп shouldComponentUpdate
// если props остались прежними, компонента не будет заново создавать свой virtual dom слепок, и реакт будет использовать прежний слепок. 
// https://medium.com/frontend-notes/purecomponent-%D0%B8-components-5c15cf206ba7


// example
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
  