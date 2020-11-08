import React from 'react';
import { shallow } from 'enzyme';

import LoaderLinear, { LoaderLinearProps } from './LoaderLinear';

const classes = {
  progressWrap: 'progressWrap',
  progressHeight: 'progressHeight',
};

const setUp = (props: LoaderLinearProps) =>
  shallow(<LoaderLinear {...props} />);

describe('<LoaderLinear />', () => {
  it('should render showed LoaderLinear component', () => {
    const wrapper = setUp({
      show: true,
      classes,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render hidden LoaderLinear component', () => {
    const wrapper = setUp({
      show: false,
      classes,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
