// proptypes

// в proptypes описываются все зависимоти, необходимые для работы компонента

yarn add prop-types

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


// - defaultProps
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

// - PropTypes.shape
// для описания объектов
static propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
  }).isRequired
};

static propTypes = {
  balance: PropTypes.shape({
    BTC: PropTypes.number,
    USD: PropTypes.number,
    EUR: PropTypes.number,
  }),
};


// - PropTypes.oneOfType
// один из описанных типов
age: PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string
])

// - PropTypes.any
// любой тип
PropTypes.any
