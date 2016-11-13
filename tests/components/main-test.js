import { MainComponent } from '../../src/components/Main';

import React from 'react';
import { shallow } from 'enzyme';

describe('main component', () => {
  describe('un-Connected component', () => {
    it('calls getAllDogsAsync (with hz client) on mount', () => {
      const getAllDogsAsync = jest.fn();
      const getOrCreateHorizonClient = jest.fn(() => 'hz');

      shallow(
        <MainComponent
          title={ { contents: 'foo' } }
          getAllDogsAsync={ getAllDogsAsync }
          getOrCreateHorizonClient={ getOrCreateHorizonClient }
          dogs={ { 1: { id: 1 } } }
        />,
      );

      expect(getAllDogsAsync).toHaveBeenCalled();
      expect(getOrCreateHorizonClient).toHaveBeenCalled();
    });
  });
});
