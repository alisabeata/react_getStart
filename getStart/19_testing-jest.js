// testing (jest)


// https://jestjs.io

// https://facebook.github.io/create-react-app/docs/running-tests

yarn test             // init
yarn test --coverage  // показывает покрытие файлов тестами
yarn test --watch     // вотчер
open coverage/lcov-report/index.html // открыть визуализацию покрытия тестами


// https://wallabyjs.com/ подсветка функций которые покрыты/нет тестами
// https://quokkajs.com/ беспл версия

// виды:
// - Юнит тестирование (тестирование каждой функции/юнита)
// - Интеграционное тестирование (selenium - основан на мозиле, cypress.js - основан на электроне (хром только с v8), описание сценария поведения пользователя)

// TDD - сначала тесты, потом код

// Snapshot testing - сначала вывод значения, затем тест (результат первого выполнения кэшируется)

// (!) тестируется только самописный код


// yarn test и yarn start можно запускать параллельно
// тест должен исполнится меньше чем за 5 сек

// при тестировании ассинхронного кода важно тестировать два момнта: начало асинхронного действия (вызов функции, промайса) и получение результата


// - именование
__tests__/
  example.test.js

example.js

// тесты можно располагать рядом с тестируемым файлом (наиболее частый подход)
example.js
example.test.js


// in example.test.js
import {sum} from '../example';

it('sum is work', () => {
  expect(sum(1, 2)).toEqual(3);
});

// in example.js
export const sum = (a, b) => a + b;




// it | test — взаимозаменяемы
// в одном тестовом кейсе ожидается один expect


// методы
// https://jestjs.io/docs/en/expect.html

// проверка на равенство
// .toBe()                   — проверка на равенство (проверяет на строгое соответствие ===)
// .toEqual()                — проверка на равенство (проверет по значениям полей, можно делать сравнение объектов)
// .not.toBe()               — отрицание
// .toBeInstanceOf(Class)    - является ли экземпляром определённого класса (прим. Promise)
// .toMatchObject({})        - проверка на объекта на равенство

// проверка на true
// .toBeNull()               — проверка на null
// .toBeUndefined()          — проверка на undefined
// .toBeDefined()            — наличие метода или поля объекта (не undefined)
// .toBeTruthly()            — на true
// .toBeFalsy()              — на false

// numbers
// .toBeGreaterThan()        — больше чем
// .toBeGreaterThanOrEqual() — больше или равно
// .toBeLessThan()           — меньше чем
// .toBeLessThanOrEqual()    — меньше или равно
// .toBeCloseTo()            — сравнение с указанием округления, вторым аргументом (тк 0.2 + 0.1 = 0.30000000000000004)

// strings
// .toMatch()                — сравнение с regExp

// arrays
// .toContain()              — проверка на наличие элемента


// test.skip('...', () => )  — пропустить тест
// test.only('...', () => )  — выполнить только этот тест


// in example.test.js
it('immutablePush return new array' , () => {
  const ar = [1, 2, 3];

  expect(immutablePush(ar, 4)).toEqual([1, 2, 3, 4]);
});

// in example.js
export const immutablePush = (arr, item) => [...arr, item];



// - describe
// объединение тестов в блоки
// describe.skip('name', () => {}) пропустить блок
// describe.only('name', () => {}) выполнять только этот блок
// (!) нет ограничений на вложение describe друг в друга
describe('example.js', () => {
  it('sum is work', () => {
    expect(sum(1, 2)).toEqual(3);
  });
  
  it('immutablePush return new array' , () => {
    const ar = [1, 2, 3];
  
    expect(immutablePush(ar, 4)).toEqual([1, 2, 3, 4]);
  });
});


// - beforeEach(), afterEach()
// очистка бд или кэша перед(после) выполнением тестов (актуально для nodeJs)
// область видимости зависит от блока describe

// - beforeAll(), afterAll()
// исполняется перед(после) всех тестов, так же область видимости блок describe



// - test Promises

// in example.test.js
it('promiseTimeout return promise after timeout' , () => {
  expect(
    promiseTimeout(() => {
      return 'test';
    }, 1000)
  ).toBeInstanceOf(Promise);
});

// in example.js
export const promiseTimeout = (fn, timeout) => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve(fn());
    }, timeout);
  });


// тест resolve
// in example.test.js
it('promiseTimeout return correct value' , done => {
  expect(
    promiseTimeout(() => {
      return 'test string';
    }, 1000)
  ).resolve.toEqual('test string');
});



// - done в качестве аргумента

// in example.test.js
it('promiseTimeout return promise after timeout' , done => {
  expect(
    promiseTimeout(() => {
      done();
    }, 1000)
  ).toBeInstanceOf(Promise);
});



// - Snapshot testing

// first step
it('multipl' , () => {
  console.log(multipl(100, 100));
});
// second
it('multipl' , () => {
  expect(multipl(100, 100)).toEqual(10000);
});
// third
it('multipl' , () => {
  expect(multipl(100, 100)).toMatchSnapshot();
});

// .toMatchSnapshot() создаёт папку __snapshot__ с логами выполнения функции




// - test actions
// если исп redux-action, экшены можно не тестировать
import {someActions} from '../someActions';

describe('action creator someActions', () => {
  it('return correct action with type NEW_USER', () => {
    expect(someActions('test').toEqual({
      type: 'NEW_USER',
      payload: 'test'
    }));
  });
});


// - test redusers
import {someReducer} from '../someReducer';
import {MOVE_ORDERS_TO_SOMEREDUSER} from '../../actions/someTypes';
import {MOVE_ORDERS_TO_CUSTOMER} from '../../actions/otherTypes';

describe('redures descr', () => {
  it('action with type MOVE_ORDERS_TO_SOMEREDUSER add action.payload for orders', () => {
    const next = someReducer(undefined, {
      type: MOVE_ORDERS_TO_SOMEREDUSER,
      payload: {name: 'test'}
    });
    // проверяет, что новый стейт содержит добавленные элемент, next.order — следующий стейт
    expect([{name: 'test'}]).toEqual(expect.arrayContaining(next.order));
  });
  
  it('action with type MOVE_ORDERS_TO_SOMEREDUSER add action.payload for orders', () => {
    const next = someReducer({
      orders: [{id: 1}]
    }, {
      type: MOVE_ORDERS_TO_CUSTOMER,
      payload: {id: 1}
    });
    
    expect(next.orders).toEqual([]);
  });
});



// - Mock Functions / создание функций в jest
// могут исп когда нет доступа к функции
// https://doc.ebichu.cc/jest/docs/ru/mock-function-api.html
import {total} from './App';

const add = jest.fn(() => 3);

test('add', () => {
  expect(add(1, 2)).toBe(3);
  expect(add(5, 2)).toBe(7);
});


// - simulate
wrapper
  .find('[name="test"]') // find <input name="test" />
  .simulate('change', {  // симулирует изменение инпута
    target: {
      name: 'test',
      value: 'test',
    }
  });
