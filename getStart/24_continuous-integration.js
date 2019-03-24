// continuous integration


// этапы:
// - запуск тестов
// - доставка билда на сервер
// - вывод статистики по коду



// - Travis CI
// доступен в беспл режиме только для паблик репозиториев на гитхаб
// https://travis-ci.org/
// доплонительное тестирование на внешнем сервере
// Travis работает на докере
// есть возможность отправлять логи, например, в чат слака

// - Circle CI
// https://circleci.com/ аналог Travis
// беспл режим для огр кол-ва проектов

// https://www.netlify.com/ free хостинг
// https://www.scaleway.com/ дешёвый хостинг


// .travis.yml
language: node_js
node_js:
  - 9
  
cache: 
  directories:
    - ~/.npm
    - ~/.cache
    
install:
  - yarn install
    
script:
  // описание shell команд
  - yarn build
  - yarn test
  // вполне можно дописать любую команду для линукса
  // rm build/static/js/*.js.map   напр удаление сорсмапов
  
  
  
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
    
    
// деплой на хероку
// https://www.heroku.com/
    
// .travis.yml
...

deploy:
  provider: heroku
  api_key:
    secure: $HEROKU_KEY // $HEROKU_KEY переменная среды, указ в настр travis
  app: name-project
  