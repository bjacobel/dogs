import ratings from '../../src/reducers/ratings';
import { GET_ALL_DOGS_SUCCEEDED } from '../../src/actions/dogs';
import { UPDATE_RATING_SUCCEEDED } from '../../src/actions/ratings';

describe('ratings reducer', () => {
  describe(`action type ${GET_ALL_DOGS_SUCCEEDED}`, () => {
    it('returns dogs filtered and sorted by rating', () => {
      const action = {
        type: GET_ALL_DOGS_SUCCEEDED,
        payload: {
          dogs: [
            {
              id: 1,
              rating: -100,
              note: 'should be last',
            },
            {
              id: 2,
              note: 'should be left from result',
            },
            {
              id: 3,
              rating: 100,
              note: 'should be first',
            },
            {
              id: 4,
              rating: 1,
              note: 'should be third',
            },
            {
              id: 5,
              rating: 10,
              note: 'should be second',
            },
          ],
        },
      };
      expect(ratings({}, action)).toEqual([
        { id: 3, rating: 100 },
        { id: 5, rating: 10 },
        { id: 4, rating: 1 },
        { id: 1, rating: -100 },
      ]);
    });
  });

  describe(`action type ${UPDATE_RATING_SUCCEEDED}`, () => {
    const state = [
      { id: 1, rating: -100 },
      { id: 2, rating: 0 },
      { id: 3, rating: 100 },
      { id: 4, rating: 1 },
      { id: 5, rating: 10 },
    ];

    it("should insert this dog into the lineup if it wasn't in it already", () => {
      expect(ratings(state, {
        type: UPDATE_RATING_SUCCEEDED,
        payload: {
          id: 6,
          rating: 5,
        },
      })).toEqual([
        { id: 3, rating: 100 },
        { id: 5, rating: 10 },
        { id: 6, rating: 5 },
        { id: 4, rating: 1 },
        { id: 2, rating: 0 },
        { id: 1, rating: -100 },
      ]);
    });

    it('should rerank the dogs if a dog already in the lineup leveled up', () => {
      expect(ratings(state, {
        type: UPDATE_RATING_SUCCEEDED,
        payload: {
          id: 2,
          rating: 11,
        },
      })).toEqual([
        { id: 3, rating: 100 },
        { id: 2, rating: 11 },
        { id: 5, rating: 10 },
        { id: 4, rating: 1 },
        { id: 1, rating: -100 },
      ]);
    });
  });

  describe('by default', () => {
    it('does nothing', () => {
      expect(ratings({}, { type: 'foo' })).toEqual({});
    });

    it('preserves passed state', () => {
      const state = { foo: 'bar' };
      expect(ratings(state, { type: 'foo' })).toEqual(state);
    });
  });
});
