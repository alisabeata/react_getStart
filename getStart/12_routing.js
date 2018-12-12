// react-routing

// - Link
// - Route
// - Switch
// - Redirect
// - вложенные роуты 
// - API react-router 


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

// для рендеринга стейтфул компонент исп аттр component
<Route path="/about" component={About} />
// для стейтлесс (функция с ретёрн) исп render
<Route path="/about" render={(match, location, history) => {<About match={match} ... />}} />
// такой подход исп для того чтобы избежать лишний рендеринг

// аттр chilren рендерит всегда, но исп например для анимаций, внутри сопоставляет совпадение match
<Route path="/about" chilren={(match) => {<About match={match} ... />}} />


// - Switch
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

<Switch>
  <Route path="/" exact={true} component={Home} />
  <Route path="/about" component={About} />
  <Route path="/hobbies" component={Hobbies} />
</Switch>
  
// Switch рендерит только активный компонент, первый прошедший все условия 
// можно исп для отображения стр по-умолчанию NotFound (path="*")
// если роут не соотв не одному из условий
  
...
const NotFound = () => <p>Not Found</p>;

<Switch>
  <Route path="/" exact={true} component={Home} />
  <Route path="/about" component={About} />
  <Route path="/hobbies" component={Hobbies} />
  <Route path="*" component={NotFound} />
</Switch>
  
  
// - Redirect
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom';

<Switch>
  <Route path="/" exact={true} component={Home} />
  <Route path="/about" component={About} />
  <Route path="/hobbies" component={Hobbies} />
  <Redirect to="/" />
</Switch>
  
// для описания действий по-умолчанию можно исп Redirect, если Route не проходит соотв path
// Redirect инициирует переход на указанный path через аттр to=""
// так же можно исп Redirect с условием переадресации с определёного url (букваьно переадресация со старого урла на новый) from=""
<Redirect from="/n" to="/news" />

  
  
// - вложенные роуты 
const SportComponent = ({match}) => {
  const {id} = match.params;
  return <p>{id}</p>
};

const Hobbies = ({match}) => {
  return (
    <div>
      <p>Hobbies</p>
      <div>
        <Link to={`${match.url}/yoga`}>Yoga</Link>
        <Link to={`${match.url}/meditation`}>Meditation</Link>
      </div>

      <div>
        <Route 
          path={`${match.path}/:id`} 
          component={SportComponent}
        />
      </div>
    </div>
  );
};

// для вложенных <Link /> исп match.url 
// для вложенных <Route /> исп match.path 

// один и тот же путь:
// >> url: "hobbies/yoga"
// >> path: "hobbies/:id"


// API react-router 
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom/docs/api

// -- BrowserRouter
// -- HashRouter
// -- MemoryRouter
// -- StaticRouter
// -- Router
// -- Link
// -- NavLink
// -- Prompt
// -- Redirect
// -- Route
// -- Switch
// -- withRouter
