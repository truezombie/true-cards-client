import React from 'react';
import { shallow } from 'enzyme';

import Test from './Test';

describe('TEST COMPONENT', () => {
  it('render <Test />', () => {
    const wrapper = shallow(<Test text='test text' />);

    expect(wrapper.text()).toEqual('test text');
  });
});
