import React from 'react';
import { shallow } from 'enzyme';

import { MainComponent } from '../../src/components/Main';

describe('main component', () => {
  describe('un-Connected component', () => {
    it('calls getAllDogsAsync (with fb client) on mount', () => {
      const getAllDogsAsync = jest.fn();
      const getOrCreateFirebaseClient = jest.fn(() => 'fb');

      shallow(
        <MainComponent
          title={ { contents: 'foo' } }
          getAllDogsAsync={ getAllDogsAsync }
          getOrCreateFirebaseClient={ getOrCreateFirebaseClient }
          dogs={ { 1: { id: 1 } } }
        />,
      );

      expect(getAllDogsAsync).toHaveBeenCalled();
      expect(getOrCreateFirebaseClient).toHaveBeenCalled();
    });
  });
});
