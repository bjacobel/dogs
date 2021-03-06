import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  GET_ALL_DOGS_FAILED,
  GET_ALL_DOGS_SUCCEEDED,
  getAllDogsFailed,
  getAllDogsSucceeded,
  getAllDogsAsync,
  GET_SPECIFIC_DOG_FAILED,
  GET_SPECIFIC_DOG_SUCCEEDED,
  getSpecificDogFailed,
  getSpecificDogSucceeded,
  getSpecificDogAsync,
} from '../../src/actions/dogs';
import {
  LOADING_STARTED,
  LOADING_ENDED,
} from '../../src/actions/loading';
import {
  getAllDogs,
  getSpecificDog,
  watchRatings,
} from '../../src/services/firebase';

jest.mock('../../src/services/firebase');

const mockStore = configureMockStore([thunk]);

describe('dog actions', () => {
  describe('dog collection actions', () => {
    describe('getAllDogsSucceeded', () => {
      it('returns a type and the passed objects in payload', () => {
        expect(getAllDogsSucceeded({ 1: { id: 1 } })).toEqual({
          type: GET_ALL_DOGS_SUCCEEDED,
          payload: {
            dogs: { 1: { id: 1 } },
          },
        });
      });
    });

    describe('getAllDogsFailed', () => {
      it('returns a type and the passed err in payload + err prop', () => {
        expect(getAllDogsFailed('foo')).toEqual({
          type: GET_ALL_DOGS_FAILED,
          payload: {
            error: 'foo',
          },
        });
      });
    });

    describe('getAllDogsAsync', () => {
      let store;

      beforeEach(() => {
        store = mockStore({});
        getAllDogs.mockImplementation(() => Promise.resolve({
          val: () => ({ 1: { id: 1 }, 2: { id: 2 } }),
        }));
        watchRatings.mockImplementation(() => Promise.resolve({
          val: () => ({ 1: { id: 1, rating: 5000 } }),
        }));
      });

      it('dispatches loadingStarted', () => {
        return store.dispatch(getAllDogsAsync()).then(() => {
          expect(store.getActions()).toEqual(jasmine.arrayContaining([
            { type: LOADING_STARTED },
          ]));
        });
      });

      it('calls getAllDogs, then on success it dispatches loadingEnded and getAllDogsSucceeded', () => {
        return store.dispatch(getAllDogsAsync()).then(() => {
          expect(store.getActions()).toEqual(jasmine.arrayContaining([
            { type: LOADING_ENDED },
            jasmine.objectContaining({ type: GET_ALL_DOGS_SUCCEEDED }),
          ]));
        });
      });

      it('calls getAllDogs, on fail it dispatches loadingEnded and getAllDogsFailed', () => {
        getAllDogs.mockImplementationOnce(() => Promise.reject('error'));

        return store.dispatch(getAllDogsAsync()).catch(() => {
          expect(store.getActions()).toEqual(jasmine.arrayContaining([
            { type: LOADING_ENDED },
            jasmine.objectContaining({ type: GET_ALL_DOGS_FAILED }),
          ]));
        });
      });

      it('calls getAllDogs, on close it starts a watcher for ratings events', () => {
        return store.dispatch(getAllDogsAsync()).then(() => {
          expect(watchRatings).toHaveBeenCalled();
        });
      });
    });
  });

  describe('individual dog actions', () => {
    describe('getSpecificDogSucceeded', () => {
      it('returns a type and the passed objects in payload', () => {
        expect(getSpecificDogSucceeded({ id: 1 })).toEqual({
          type: GET_SPECIFIC_DOG_SUCCEEDED,
          payload: {
            dog: { id: 1 },
          },
        });
      });
    });

    describe('getSpecificDogFailed', () => {
      it('returns a type and the passed err in payload + err prop', () => {
        expect(getSpecificDogFailed('foo')).toEqual({
          type: GET_SPECIFIC_DOG_FAILED,
          payload: {
            error: 'foo',
          },
        });
      });
    });

    describe('getSpecificDogAsync', () => {
      let store;

      beforeEach(() => {
        store = mockStore({});
        getSpecificDog.mockImplementation(() => Promise.resolve({
          val: () => ({ id: 1 }),
        }));
      });

      it('dispatches loadingStarted', () => {
        return store.dispatch(getSpecificDogAsync()).then(() => {
          expect(store.getActions()).toEqual(jasmine.arrayContaining([
            { type: LOADING_STARTED },
          ]));
        });
      });

      it('calls getSpecificDog, then on success it dispatches loadingEnded and getSpecificDogSucceeded', () => {
        return store.dispatch(getSpecificDogAsync()).then(() => {
          expect(store.getActions()).toEqual(jasmine.arrayContaining([
            { type: LOADING_ENDED },
            jasmine.objectContaining({ type: GET_SPECIFIC_DOG_SUCCEEDED }),
          ]));
        });
      });

      it('calls getSpecificDog, on fail it dispatches loadingEnded and getSpecificDogFailed', () => {
        getSpecificDog.mockImplementationOnce(() => Promise.reject('error'));

        return store.dispatch(getSpecificDogAsync()).catch(() => {
          expect(store.getActions()).toEqual(jasmine.arrayContaining([
            { type: LOADING_ENDED },
            jasmine.objectContaining({ type: GET_SPECIFIC_DOG_FAILED }),
          ]));
        });
      });
    });
  });
});
