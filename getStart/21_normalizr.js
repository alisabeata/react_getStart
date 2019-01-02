// normalizr

yarn add normalizr

// структурирование данных
// удаление дублироавния данных

// запрос к http://api.tvmaze.com/shows/1?embed=cast (на примере)

import {normalize, schema} from 'normalizr';

const showSchema = new schema.Entity('show');

fetch('http://api.tvmaze.com/shows/1?embed=cast', {
  cors: true
})
  .then(response => response.json())
  .then(show => console.log(normalize(show, showSchema)));
