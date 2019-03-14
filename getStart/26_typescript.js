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

// - указание типов для элементов массива
const arr: number[] = [1, 2, 3];
const arr: Array<number> = [1, 2, 3];
const arr: Array<number | string> = [1, 2, '3'];



// - tuples / кортежи --  упорядоченный набор фиксированной длины
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
// необходим для большей наглядности (самодокументируемости кода)
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

// пример
// явное указание сущностей вместо исп числовых индексов элементов
enum Fruit {
  Apple,  // == 0
  Orange, // == 1
  Banana  // == 2
}

function drawImg(fruit: Fruit) {
  const domElement: HTMLImageElement = document.createElement('img');
  
  switch (fruit) {
    case Fruit.Apple:
      domElement.src = 'img/apple.jpg';
      break;
    case Fruit.Orange:
      domElement.src = 'img/apple.jpg';
      break;
    case Fruit.Banana:
      domElement.src = 'img/apple.jpg';
      break;
  }
  document.body.appendChild(domElement);
}

drawImg(Fruit.Banana);


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


// - тип void
// функции присваивается тип void, если она ничего не возвращает
// аналогично null, undefined


// - присваивание типов функциям
function getStringFromNumber(num: number): string {
  return num.toString();
}

// - условия для объявления типов
function sum(a: number | string, b: number | string) {}

// - условия для наличия аргументов/параметров
// прим, count? вопрос в конце значит, что аргумента может и не быть
function printCount(str: string, count?: string) {}

// (!) опциональные параметры с ? указываются в конце перечисляемых аргументов

// (!) rest параметры обозначаются типом массива
function (...names: string[])


// - type assertion (утверждение типов)
const someData: any = 'Some string'; // вместо 'Some string' может быть результат выполнения сторонней библиотеки
const strLn1: number = (<string>someData).length; // утверждение что значение someData явл типом string
// or
const strLn2: number = (someData as string).length;
