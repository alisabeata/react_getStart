import React from 'react';
import {shallow, mount, render} from 'enzyme';
import App, {Header} from '../App';

describe('App component', () => {
  const wrapper = shallow(<App />);

  describe('class methods', () => {
    describe('render', () => {
      it('check div.App', () => {
        expect(wrapper.find('div.App')).toHaveLength(1);
      });

      it('check component Header', () => {
        expect(wrapper.find(Header)).toHaveLength(1);
      });

      it('check element with state value', () => {
        const elem = wrapper.find('p.App-text');
        expect(elem.props().children).toEqual(wrapper.state().value);
      });

      it('check p contain string', () => {
        const pElements = wrapper.findWhere(el => {
          return (typeof el.props().children === 'string' && el.type() === 'p');
        });
        expect(pElements).toHaveLength(1);
      });
    });
  });
});

