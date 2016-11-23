import dogs from '../../src/reducers/dogs';
import {
  GET_ALL_DOGS_SUCCEEDED,
  GET_SPECIFIC_DOG_SUCCEEDED,
} from '../../src/actions/dogs';
import { UPDATE_RATING_SUCCEEDED } from '../../src/actions/ratings';

describe('title reducer', () => {
  describe(`action type ${GET_ALL_DOGS_SUCCEEDED}`, () => {
    it('replaces existing state with dogs (transformed to object)', () => {
      expect(dogs({ 3: { id: 3 } }, {
        type: GET_ALL_DOGS_SUCCEEDED,
        payload: {
          dogs: {
            1: { id: 1 },
            2: { id: 2 },
          },
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

  describe(`action type ${UPDATE_RATING_SUCCEEDED}`, () => {
    const preState = {
      1: {
        id: 1,
        rating: 10,
        other: 'data',
      },
      2: {
        id: 2,
        rating: 20,
        other: 'data',
      },
      3: {
        id: 3,
        rating: 30,
        other: 'data',
      },
      4: {
        id: 4,
        other: 'data',
      },
    };
    it('updates the rating of a dog with a rating already in state', () => {
      expect(dogs(preState, {
        type: UPDATE_RATING_SUCCEEDED,
        payload: {
          id: 2,
          rating: 40,
        },
      })).toEqual({
        1: {
          id: 1,
          rating: 10,
          other: 'data',
        },
        2: {
          id: 2,
          rating: 40,
          other: 'data',
        },
        3: {
          id: 3,
          rating: 30,
          other: 'data',
        },
        4: {
          id: 4,
          other: 'data',
        },
      });
    });

    it('adds a rating to a dog in state with no rating', () => {
      expect(dogs(preState, {
        type: UPDATE_RATING_SUCCEEDED,
        payload: {
          id: 4,
          rating: 100,
        },
      })).toEqual({
        1: {
          id: 1,
          rating: 10,
          other: 'data',
        },
        2: {
          id: 2,
          rating: 20,
          other: 'data',
        },
        3: {
          id: 3,
          rating: 30,
          other: 'data',
        },
        4: {
          id: 4,
          rating: 100,
          other: 'data',
        },
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
