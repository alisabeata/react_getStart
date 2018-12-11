//import React, {Component, PureComponent} from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>, 
  document.getElementById('root')
);
