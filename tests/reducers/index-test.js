jest.mock('redux');
import { combineReducers } from 'redux';

jest.mock('../../src/reducers/dogs');
jest.mock('../../src/reducers/loading');
jest.mock('../../src/reducers/error');
import dogs from '../../src/reducers/dogs';
import loading from '../../src/reducers/loading';
import error from '../../src/reducers/error';

describe('reducer index', () => {
  it('combines all my reducers', () => {
    // neccessary because the combining is done on export
    require('../../src/reducers');  // eslint-disable-line global-require

    expect(combineReducers).lastCalledWith({ dogs, loading, error });
  });
});

