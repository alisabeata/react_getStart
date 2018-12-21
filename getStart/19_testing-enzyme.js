// testing (enzyme)


// необходим для монтирования компонент в тестах
// https://airbnb.io/enzyme/


// in setupTests.js
    import {configure} from 'enzyme';
    import Adapter from 'enzyme-adapter-react-16';

    configure({adapter: new Adapter()});

// если не исп react create app
yarn add -D enzyme enzyme-adapter-react-16


// методы enzyme: shallow, mount, render
import {shallow, mount, render} from 'enzyme';


// - shallow — монтирует компоненту на верхнем уровне, без монтирования вложенных
const wrapper = shallow(<App />);
                        
wrapper.debug();        // возвращает DOM компоненты
wrapper.instance(). ... // получение экземпляра компоненты, позволяет исп все методы
                        

// - mount — монтирует компонену полностью, включая вложенные

// исп shallow преимущественнее mount, тк вписывается в концепцию unit-тестирования


// пример
import React from 'react';
import {shallow} from 'enzyme';
import App, {Header} from '../App';

describe('App component', () => {
  const wrapper = shallow(<App />);

  describe('class methods', () => {
    describe('render', () => {
      // проверка на наличие дива
      it('check div.App', () => {
        expect(wrapper.find('div.App')).toHaveLength(1);
      });
      
      // проверка на наличие компоненты
      it('check component Header', () => {
        expect(wrapper.find(Header)).toHaveLength(1);
      });
      
      // проверка на наличие значения из стейта
      it('check element with state value', () => {
        const elem = wrapper.find('p.App-text');
        expect(elem.props().children).toEqual(wrapper.state().value);
      });
      
      // проверка параграфов с текстом
      it('check p contain string', () => {
        const pElements = wrapper.findWhere(el => {
          return (typeof el.props().children === 'string' && el.type() === 'p');
        });
        expect(pElements).toHaveLength(1);
      });
    });
  });
});



// - render — обработка компонент происходит с помощью библиотеки cheerio (такой аналог поиска по селекторам jquery, реализованный для node.js)

// https://github.com/cheeriojs/cheerio

describe('App component', () => {
  const wrapper = render(<App />);
  
  it('check data id', () => {
    console.log(wrapper.find('.App-header').data('id')) // <<< доступен метод .data('id')
  });
});
