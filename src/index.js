//import React, {Component, PureComponent} from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom';


const Home = () => <p>Home</p>;
const About = () => <p>About</p>;
const NotFound = () => <p>Not Found</p>;

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

const App = () => (
  <div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/hobbies">Hobbies</Link>
    </nav>
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/hobbies" component={Hobbies} />
      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>, 
  document.getElementById('root')
);
