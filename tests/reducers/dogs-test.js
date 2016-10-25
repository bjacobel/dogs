import dogs from '../../src/reducers/dogs';
import {
  GET_ALL_DOGS_SUCCEEDED,
  GET_SPECIFIC_DOG_SUCCEEDED,
} from '../../src/actions/dogs';

describe('title reducer', () => {
  describe(`action type ${GET_ALL_DOGS_SUCCEEDED}`, () => {
    it('replaces existing state with dogs (transformed to object)', () => {
      expect(dogs({ 3: { id: 3 } }, {
        type: GET_ALL_DOGS_SUCCEEDED,
        payload: {
          dogs: [
            { id: 1 },
            { id: 2 },
          ],
        },
      })).toEqual({
        1: { id: 1 },
        2: { id: 2 },
      });
    });
  });

  describe(`action type ${GET_SPECIFIC_DOG_SUCCEEDED}`, () => {
    it('merges new dog with existing state', () => {
      expect(dogs({ 3: { id: 3 } }, {
        type: GET_SPECIFIC_DOG_SUCCEEDED,
        payload: {
          dog: { id: 2 },
        },
      })).toEqual({
        2: { id: 2 },
        3: { id: 3 },
      });
    });
  });

  describe('by default', () => {
    it('does nothing', () => {
      expect(dogs({}, { type: 'foo' })).toEqual({});
    });

    it('preserves passed state', () => {
      const state = { foo: 'bar' };
      expect(dogs(state, { type: 'foo' })).toEqual(state);
    });
  });
});
