// continuous integration

// Travis ci
// https://travis-ci.org/
// доплонительное тестирование на внешнем сервере
// Travis работает на докере
// есть возможность отправлять логи, например, в чат слака

// https://circleci.com/ аналог Travis

// https://www.netlify.com/ free хостинг


// in .travis.yml

language: node_js
node_js:
  -8
  
cach: yarn
script:
  // описание shell команд
  - yarn build
  - yarn test
  
  
// другие доступные методы
after_install: 
before_install: 
install: 
after_script: 
before_script: 
after_success: 
after_failure: 

after_success: 
  notifications:
    - slack
    - mail
    