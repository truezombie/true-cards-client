import React from 'react';
import { shallow } from 'enzyme';

import Loader, { LoaderProps } from './Loader';

const setUp = (props: LoaderProps) => shallow(<Loader {...props} />);

describe('<Loader />', () => {
  it('should render Loader component', () => {
    const wrapper = setUp({ classes: { root: 'root' } });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
