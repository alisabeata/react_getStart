// proptypes

// в proptypes описываются все зависимоти, необходимые для работы компонента

// init
// > 16v react
| yarn add prop-types

import PropTypes from 'prop-types';


// instance
function Title({children}) {
  return <p>{children}</p>;
}

Title.PropTypes = {
  children: PropTypes.string.isRequired
};

class App extends Component {
  render() {
    return <div><Title>Title text</Title></div>;
  }
}


// в случае с классами описываются так
class App extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired
  };

  render() {
    ...
  }
}


// defaultProps
// устанавливает значения по умолчанию
// defaultProps работает без подключения сторонних пакетов
class App extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isLoading: false
  };

  render() {
    ...
  }
}
