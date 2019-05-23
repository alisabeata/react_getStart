// react-routing


// API react-router 
// https://reacttraining.com/react-router/web/guides/quick-start
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom/docs/api

// - BrowserRouter
// - HashRouter
// - MemoryRouter
// - StaticRouter
// - Router
// - Link
// - NavLink
// - Prompt
// - Redirect
// - Route
// - Switch
// - withRouter


// start
yarn add react-router-dom

// (!) react-router-dom подходит для маленьких и средних приложений
// для крупных обычно исп redux-router


// - BrowserRouter
// 1) импортировать BrowserRouter
// 2) обернуть App <BrowserRouter> 

// BrowserRouter создаёт контекст и передаёт компонентам history
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>, 
  document.getElementById('root')
);

// BrowserRouter пропс
// basename
// добавляет поддиректорию к корневому приложению (вложенне компоненты добавл к нему)
<BrowserRouter basename="dashboard">


// - Link
// для создания ссылок используется внутренний компонент Link
import {Link} from 'react-router-dom';

const App = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/hobbies">Hobbies</Link>
  </nav>
);


// - Route
// отвечает за рендер компонент относительно текущего path
import {Route} from 'react-router-dom';

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
    <Route path="/" exact component={Home} />
    <Route path="/about" component={About} />
    <Route path="/hobbies" component={Hobbies} />
  </div>
);

// (!) указание :id у роута позволяет получать данные из пути
<Route path="/home/:id">
  
// (!) /name* рендерит что угодно в директории 'name'
<Route path="/about*">

// (!) exact={true} ограничивает вхождение при сопоставлении (более строгое), те именно "/"
<Route exact>

// (!) когда компонент рендерится через Route, он получает дополнительные props: history, location, match

// для рендеринга стейтфул компонент исп аттр component
<Route path="/about" component={About} />

// для Route доступен render props
<Route 
  path="/topics" 
  render={props => <Topics {...props} userName={userName} />} 
/>

// аттр chilren рендерит всегда, но исп например для анимаций, внутри сопоставляет совпадение match
<Route path="/about" chilren={(match) => {<About match={match} ... />}} />


// - Switch
import {Switch} from 'react-router-dom';

<Switch>
  <Route path="/" component={Home} exact />
  <Route path="/about" component={About} />
  <Route path="/hobbies" component={Hobbies} />
</Switch>
  
// Switch рендерит только активный компонент, первый прошедший все условия 
// можно исп для отображения стр по-умолчанию NotFound (path="*")
// если роут не соотв не одному из условий
  
...
const NotFound = () => <p>Not Found</p>;

<Switch>
  <Route path="/" component={Home} exact />
  <Route path="/about" component={About} />
  <Route path="/hobbies" component={Hobbies} />
  // рендер 404-страницы
  <Route path="*" component={NotFound} />
</Switch>
  
  
// - Redirect
import {Redirect} from 'react-router-dom';

<Switch>
  <Route path="/" component={Home} exact />
  <Route path="/about" component={About} />
  <Route path="/hobbies" component={Hobbies} />
  <Redirect to="/" />
</Switch>
  
// для описания действий по-умолчанию можно исп Redirect, если Route не проходит соотв path
// Redirect инициирует переход на указанный path через аттр to=""
// так же можно исп Redirect с условием переадресации с определёного url (букваьно переадресация со старого урла на новый) from=""
<Redirect from="/n" to="/news" />
  
// (!) редирект с любой директории на домашнюю
<Redirect from="*" to="/" />
  
// (!) при указании путей можно исп RegExp
// подробнее https://github.com/pillarjs/path-to-regexp
<Redirect from="/about(\d+)" to="/about">
<Redirect from="/about([1-9])" to="/about">
  
  
// - nested routes (вложенные роуты) 
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

// match пропс с данными от реакт роутер дом
// для вложенных <Link /> исп match.url 
// для вложенных <Route /> исп match.path 

// один и тот же путь:
// >> url: "hobbies/yoga"
// >> path: "hobbies/:id"



// - connected-react-router
// https://github.com/supasate/connected-react-router
// (!) react-router-redux was depricated
