// react-app-rewired

yarn add react-app-rewired

// https://github.com/timarney/react-app-rewired


// кастомизация поведения модулей в create-react-app 


// 1. для начала нужно создать конфиг config-overrides.js (отключить create-react-app)

// in config-overrides.js
module.export = function override(config, env) {
  console.log(config);
  return config;
}

// 2. в package.json нужно заменить "react script ..." на "react-app-rewired..."

// in package.json
"scripts" : {
  "start": "react-app-rewired start",
  ...
}
  
  
  
// на примере styled-components (добавление названий классов)
// https://github.com/withspectrum/react-app-rewire-styled-components
yarn add react-app-rewire-styled-components


// in config-overrides.js
const rewireStyledComponents = require('react-app-rewire-styled-components');

module.exports = function override(config, env) {
  let changedConfig = rewireStyledComponents(config, env, {
    displayName: true
  });
  
  return changedConfig;
}
