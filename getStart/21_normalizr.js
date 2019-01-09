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

// нормализацию данных, обычно, располагают на уровне action creators




// input
import {normalize, schema} from 'normalizr';

const author = new schema.Entity('author');
const articleSchema = new schema.Entity('articles', {
 author,
});
const articlesListSchema = new schema.Array(articleSchema);
const data = [
 {
   id: 1,
   title: 'Some Article',
   author: {
     id: 1,
     name: 'Dan',
   },
 },
 {
   id: 2,
   title: 'Other Article',
   author: {
     id: 1,
     name: 'Dan',
   },
 },
];


// output
{
 "entities": {
   "author": {
     "1": {
       "id": 1,
       "name": "Dan"
     }
   },
   "articles": {
     "1": {
       "id": 1,
       "title": "Some Article",
       "author": 1
     },
     "2": {
       "id": 2,
       "title": "Other Article",
       "author": 1
     }
   }
 },
 "result": [
   1,
   2
 ]
}
