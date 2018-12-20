import React from 'react';
import {shallow} from 'enzyme';
import App from '../App';

const wrapper = shallow(<App />);

describe('check correct render', () => {
  it('contain div with class App', () => {
    expect(wrapper.find('div.App')).toHaveLength(1);
  });
});
