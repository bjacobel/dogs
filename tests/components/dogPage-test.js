jest.mock('../../src/components/Dog');
import { DogPageComponent } from '../../src/components/DogPage';

import React from 'react';
import { shallow } from 'enzyme';

describe('child component', () => {
  it('calls getSpecificDogAsync (with a horizon client) with the param it recieves in props', () => {
    const getSpecificDogAsync = jest.fn();
    const getOrCreateHorizonClient = jest.fn(() => 'hz');

    shallow(
      <DogPageComponent
        params={ { id: 'foo' } }
        dogs={ {} }
        getSpecificDogAsync={ getSpecificDogAsync }
        getOrCreateHorizonClient={ getOrCreateHorizonClient }
      />,
    );

    expect(getSpecificDogAsync).lastCalledWith('hz', 'foo');
    expect(getOrCreateHorizonClient).toHaveBeenCalled();
  });

  it("doesn't call getSpecificDogAsync if that dog's id is already in state", () => {
    const getSpecificDogAsync = jest.fn();

    shallow(
      <DogPageComponent
        params={ { id: 'foo' } }
        dogs={ { foo: { id: 'foo' } } }
        getSpecificDogAsync={ getSpecificDogAsync }
      />,
    );

    expect(getSpecificDogAsync).not.toBeCalled();
  });

  it('renders a Dog', () => {
    const dogPage = shallow(
      <DogPageComponent
        params={ { id: 'foo' } }
        dogs={ { foo: { id: 'foo' } } }
        getSpecificDogAsync={ jest.fn() }
      />,
    );

    expect(dogPage.find('Dog').length).toBe(1);
  });
});
