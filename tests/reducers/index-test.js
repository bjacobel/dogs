import { combineReducers } from 'redux';

import dogs from '../../src/reducers/dogs';
import loading from '../../src/reducers/loading';
import error from '../../src/reducers/error';
import ratings from '../../src/reducers/ratings';
import firebase from '../../src/reducers/firebase';

jest.mock('redux');
jest.mock('../../src/reducers/dogs');
jest.mock('../../src/reducers/loading');
jest.mock('../../src/reducers/error');
jest.mock('../../src/reducers/ratings');
jest.mock('../../src/reducers/firebase');

describe('reducer index', () => {
  it('combines all my reducers', () => {
    // neccessary because the combining is done on export
    require('../../src/reducers');  // eslint-disable-line global-require

    expect(combineReducers).lastCalledWith({ dogs, loading, error, ratings, firebase });
  });
});

