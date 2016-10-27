import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Observable } from 'rxjs';

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

jest.mock('../../src/services/horizon');
import {
  getAllDogs,
  getSpecificDog,
} from '../../src/services/horizon';

const mockStore = configureMockStore([thunk]);

describe('dog actions', () => {
  describe('dog collection actions', () => {
    describe('getAllDogsSucceeded', () => {
      it('returns a type and the passed objects in payload', () => {
        expect(getAllDogsSucceeded([{ id: 1 }])).toEqual({
          type: GET_ALL_DOGS_SUCCEEDED,
          payload: {
            dogs: [{ id: 1 }],
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
        getAllDogs.mockImplementation(() => Observable.of([{ id: 1 }]));
      });

      it('dispatches loadingStarted', () => {
        store.dispatch(getAllDogsAsync()).subscribe(() => {
          expect(store.getActions()).toEqual(jasmine.arrayContaining([
            { type: LOADING_STARTED },
          ]));
        });
      });

      it('calls getAllDogs, then on success it dispatches loadingEnded and getAllDogsSucceeded', () => {
        store.dispatch(getAllDogsAsync()).subscribe(() => {
          expect(store.getActions()).toEqual(jasmine.arrayContaining([
            { type: LOADING_ENDED },
            jasmine.objectContaining({ type: GET_ALL_DOGS_SUCCEEDED }),
          ]));
        });
      });

      it('calls getAllDogs, on fail it dispatches loadingEnded and getAllDogsFailed', () => {
        getAllDogs.mockImplementationOnce(() => Observable.throw('error'));

        store.dispatch(getAllDogsAsync()).subscribe(jest.fn(), () => {
          expect(store.getActions()).toEqual(jasmine.arrayContaining([
            { type: LOADING_ENDED },
            jasmine.objectContaining({ type: GET_ALL_DOGS_FAILED }),
          ]));
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
        getSpecificDog.mockImplementation(() => Observable.of({ id: 1 }));
      });

      it('dispatches loadingStarted', () => {
        store.dispatch(getSpecificDogAsync()).subscribe(() => {
          expect(store.getActions()).toEqual(jasmine.arrayContaining([
            { type: LOADING_STARTED },
          ]));
        });
      });

      it('calls getSpecificDog, then on success it dispatches loadingEnded and getSpecificDogSucceeded', () => {
        store.dispatch(getSpecificDogAsync()).subscribe(() => {
          expect(store.getActions()).toEqual(jasmine.arrayContaining([
            { type: LOADING_ENDED },
            jasmine.objectContaining({ type: GET_SPECIFIC_DOG_SUCCEEDED }),
          ]));
        });
      });

      it('calls getSpecificDog, on fail it dispatches loadingEnded and getSpecificDogFailed', () => {
        getSpecificDog.mockImplementationOnce(() => Observable.throw('error'));

        store.dispatch(getSpecificDogAsync()).subscribe(jest.fn(), () => {
          expect(store.getActions()).toEqual(jasmine.arrayContaining([
            { type: LOADING_ENDED },
            jasmine.objectContaining({ type: GET_SPECIFIC_DOG_FAILED }),
          ]));
        });
      });
    });
  });
});
