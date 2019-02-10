// axios

yarn add axios

import axios from 'axios';

// https://github.com/axios/axios


// библиотека для выполнения либо HTTP-запросов в Node.js, либо XMLHttpRequests в браузере
// axios в отличие от fetch работает на сервере
// автоматические преобразования JSON-данных


axios
  .get('http://api.tvmaze.com/shows/100?embed=cast')
  .then(show => {
    store.dispatch({
      type: 'SHOW_SUCCESS',
      payload: normalize(show, showSchema)
    });
  });

// - методы
// request
// get
// post
// patch
// delete
// options
// patch

// create (для указания хедеров, токенов и пр)


// axios-jsonp адаптер для работы с jsonp
const request = axios.create({
  params: {
    TOKEN,
  },
  adapter: jsonpAdapter
});

request.get(...).then(...)

// в axios доступен функционал отмены запроса
