import Dog from '../../src/components/Dog';

import React from 'react';
import { shallow } from 'enzyme';

describe('Dog component', () => {
  it('renders an image with the src passed in props', () => {
    const dog = shallow(<Dog dog={ { photoSrc: 'https://foo.com' } } />);
    expect(dog.find('img').first().prop('src')).toEqual('https://foo.com');
  });
});
