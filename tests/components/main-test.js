import { MainComponent } from '../../src/components/Main';

import React from 'react';
import { shallow } from 'enzyme';

describe('main component', () => {
  describe('un-Connected component', () => {
    it('calls getAllDogsAsync on mount', () => {
      const getAllDogsAsync = jest.fn();
      shallow(
        <MainComponent
          title={ { contents: 'foo' } }
          getAllDogsAsync={ getAllDogsAsync }
          dogs={ { 1: { id: 1 } } }
        />
      );
      expect(getAllDogsAsync).toHaveBeenCalled();
    });
  });
});
