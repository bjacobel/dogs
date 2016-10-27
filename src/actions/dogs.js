import {
  loadingStarted,
  loadingEnded,
} from './loading';
import {
  getAllDogs,
  getSpecificDog,
} from '../services/horizon';

export const GET_ALL_DOGS_FAILED = 'GET_ALL_DOGS_FAILED';
export const GET_ALL_DOGS_SUCCEEDED = 'GET_ALL_DOGS_SUCCEEDED';

export const getAllDogsSucceeded = (dogs) => {
  return { type: GET_ALL_DOGS_SUCCEEDED, payload: { dogs } };
};

export const getAllDogsFailed = (error) => {
  return { type: GET_ALL_DOGS_FAILED, payload: { error } };
};

export const getAllDogsAsync = () => {
  return (dispatch) => {
    dispatch(loadingStarted());

    const dogObservable = getAllDogs();
    dogObservable.subscribe(
      (dogs) => {
        dispatch(loadingEnded());
        dispatch(getAllDogsSucceeded(dogs));
      },
      (error) => {
        dispatch(loadingEnded());
        dispatch(getAllDogsFailed(error));
      }
    );

    return dogObservable;
  };
};

export const GET_SPECIFIC_DOG_FAILED = 'GET_SPECIFIC_DOG_FAILED';
export const GET_SPECIFIC_DOG_SUCCEEDED = 'GET_SPECIFIC_DOG_SUCCEEDED';

export const getSpecificDogSucceeded = (dog) => {
  return { type: GET_SPECIFIC_DOG_SUCCEEDED, payload: { dog } };
};

export const getSpecificDogFailed = (error) => {
  return { type: GET_SPECIFIC_DOG_FAILED, payload: { error } };
};

export const getSpecificDogAsync = (id) => {
  return (dispatch) => {
    dispatch(loadingStarted());

    const dogObservable = getSpecificDog(id);
    dogObservable.subscribe(
      (dog) => {
        dispatch(loadingEnded());
        dispatch(getSpecificDogSucceeded(dog));
      },
      (error) => {
        dispatch(loadingEnded());
        dispatch(getSpecificDogFailed(error));
      }
    );

    return dogObservable;
  };
};
