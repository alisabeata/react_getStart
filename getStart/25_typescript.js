// typeScript

yarn create react-app my-app --scripts-version=react-scripts-ts
cd my-app
yarn start

// https://github.com/wmonk/create-react-app-typescript


// имеет ряд различий с js
// развивается параллельно от него

// для подключения файлов исп require
const logo = require('./logo.svg');

// подключение модулей через импорт выглядит немного иначе
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


// наследование компонента через React.Component
class App extends React.Component {
  ...
}

// для тайпскрипт-файлов с jsx исп расширение .tsx, для обычных .ts
  
// поддерживает автоматическое присвоение типов
const a = 'str';
console.log(a / 1); // выдаст ошибку компиляции


// - присвоение типов
const a: string = 'a';
const b: number = 1;

// в тайпскрипте элементы массива должны быть одного и того же типа
const arr: number[] = [1, 2, 3];
const arr: Array<number> = [1, 2, 3];



// - tuples / кортежи --  упорядоченный набор фиксированной длины (массивы с разными типами)
// в кортеж нельзя добавлять элементы, а так же нельзя менять местами элементы и нарушать порядок следования
// пример кортежей из js -- аргументы функции, так же синтаксич конструкции, например список инициализации массива
const arr: [number, string, string] = [1, '2', 'a'];


const pair = (...args) => Object.freeze( args.slice(0,2) );
// могут быть только 2 аргумента
const pair = (x, y) => Object.freeze([x, y]);
const par = pair ( 1, 2, 3 ); // 3 не добавится
par[0] = 3; // нельзя изменить
par[4] = 4; // нельзя добавить
console.log(par); // >> [1,2]


// кортеж на тайпскрипт
const myTuple: [string, number] = ['foo', 123];
myTuple[0] = 123; // << ошибка

// кортеж можно описать через интефейс, расширив базовый тип Array
interface MyTuple<T,U> extends Array<T|U> {
    0: T;
    1: U;
}
const mytuple: MyTuple<boolean, number> = [true, 123];


// можно указать длину кортежа
interface MyTuple extends Array<number | string> {
    0: number;
    1: string;
    length: 2; // присвоение длины
}
const mytuple: MyTuple = [123, 'abc', 'foo']; // << ошибка



// - enum
// enum способ перечисления, указывает на индекс элемента в списке или вычисляемое значение
enum SomeEnum {
    // constant members
    None, 
    One,
    Three = 1 + 3,
    Four = 2 << 2,
    Five = Three | Four,
    // computed member
    Six = "123".length
}

console.log(SomeEnum.None); // 0
console.log(SomeEnum.One); // 1
console.log(SomeEnum.Three); // 4
console.log(SomeEnum.Four); // 8
console.log(SomeEnum.Five); // 12
console.log(SomeEnum.Six); // 3


// - interface
// указание типов для сложных объектов

interface SomeObj {
  a: number, 
  b: string
}

const a: SomeObj = {
  a: 1,
  b: 'str'
}
