import error from '../../src/reducers/error';
import {
  GET_ALL_DOGS_FAILED,
  GET_SPECIFIC_DOG_FAILED,
} from '../../src/actions/dogs';


describe('loading reducer', () => {
  describe(`action type ${GET_ALL_DOGS_FAILED}`, () => {
    it('sets error in state', () => {
      expect(error({}, { type: GET_ALL_DOGS_FAILED, payload: { error: { e: 1 } } })).toEqual({ e: 1 });
    });
  });

  describe(`action type ${GET_SPECIFIC_DOG_FAILED}`, () => {
    it('sets error in state', () => {
      expect(error({}, { type: GET_SPECIFIC_DOG_FAILED, payload: { error: { e: 1 } } })).toEqual({ e: 1 });
    });
  });

  describe('by default', () => {
    it('does nothing', () => {
      expect(error({}, { type: 'foo' })).toEqual({});
    });

    it('preserves passed state', () => {
      const state = { foo: 'bar' };
      expect(error(state, { type: 'foo' })).toEqual(state);
    });
  });
});
