// react-routing

// - Link
// - Route


// start
yarn add react-router-dom

import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>, 
  document.getElementById('root')
);


// - Link
// для создания ссылок используется внутренний компонент Link
import {BrowserRouter, Link} from 'react-router-dom';

const App = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/hobbies">Hobbies</Link>
  </nav>
);


// - Route
// отвечает за рендер компонент относительно текущего path
import {BrowserRouter, Link, Route} from 'react-router-dom';

const Home = () => <p>Home</p>;
const About = () => <p>About</p>;
const Hobbies = () => <p>Hobbies</p>;

const App = () => (
  <div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/hobbies">Hobbies</Link>
    </nav>
    <Route path="/" exact={true} component={Home} />
    <Route path="/about" component={About} />
    <Route path="/hobbies" component={Hobbies} />
  </div>
);

// exact={true} ограничивает вхождение при сопоставлении (более строгое), те именно "/"


// когда компонент рендерится через Route, он получает дополнительные props: 
// history
// location
// match