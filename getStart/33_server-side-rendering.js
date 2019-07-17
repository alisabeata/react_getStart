// server side rendering SSR

// demo: https://github.com/StephenGrider/ReactSSRCasts

// сервер сайд рендеринг ускоряет отображение контента для пользователя (3 шага рендеринга >> 1 шаг)
// seo-friendly


// API-server > Rendering Sever (делается на этом шаге) > Browser

// SSR performance
// https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8


// структура
// GET('/') > Express Server > <Home/>HTML

// решение
// JSX on server side - запуск вебпака на сервере
// renderToString()

// renderToString() метод ReactDOM который рендерит компонент как HTML (render() исп компонент)



// index.js
const express = require('express');
const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const { Home } = require('./client/components/Home');
const app = express();

app.get('/', (req, res) => {
  const content = renderToString(<Home />);

  res.send(content);
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
});


// Home.js
import React from 'react';

export const Home = () => <div>Home page</div>;

// webpack.server.js
const path = require('path');

module.exports = {
  // Inform webpack that we're building a bundle
  // for NodeJS, rather than for the browser
  target: 'node',

  // Tell webpack the root file of our
  // server app
  entry: './src/index.js',

  // Tell webpack where to put the put output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // Tell webpack to run babel on every file it runs through
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0',
            ['env', { targets: { browsers: ['last 2 versions'] } }]
          ]
        }
      }
    ]
  }
};


// package.json
{
  "name": "react-ssr",
  "version": "1.0.0",
  "description": "Server side rendering project",
  "main": "index.js",
  "scripts": {
    "dev": "npm-run-all --parallel dev:*",
    "dev:server": "nodemon --watch build --exec \"node build/bundle.js\"",
    "dev:build-server": "webpack --config webpack.server.js --watch",
    "dev:build-client": "webpack --config webpack.client.js --watch"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "0.16.2",
    "babel-cli": "6.26.0",
    "babel-core": "6.26.0",
    "babel-loader": "7.1.2",
    "babel-preset-env": "1.6.0",
    "babel-preset-es2015": "6.24.1",
    "babel-preset-es2017": "6.24.1",
    "babel-preset-react": "6.24.1",
    "babel-preset-stage-0": "6.24.1",
    "compression": "1.7.0",
    "concurrently": "3.5.0",
    "express": "4.15.4",
    "express-http-proxy": "1.0.6",
    "lodash": "4.17.4",
    "nodemon": "1.12.0",
    "npm-run-all": "4.1.1",
    "react": "16.0.0",
    "react-dom": "16.0.0",
    "react-helmet": "5.2.0",
    "react-redux": "5.0.6",
    "react-router-config": "1.0.0-beta.4",
    "react-router-dom": "4.2.2",
    "redux": "3.7.2",
    "redux-thunk": "2.2.0",
    "serialize-javascript": "1.4.0",
    "webpack": "3.5.6",
    "webpack-dev-server": "2.8.2",
    "webpack-merge": "4.1.0",
    "webpack-node-externals": "1.6.0"
  }
}


// в теминале
npm run dev:build-server
node build/bundle.js
