import {
  loadingStarted,
  loadingEnded,
} from './loading';
import { subscribeToRatingsUpdates } from './ratings';
import {
  getAllDogs,
  getSpecificDog,
} from '../services/firebase';

export const GET_ALL_DOGS_FAILED = 'GET_ALL_DOGS_FAILED';
export const GET_ALL_DOGS_SUCCEEDED = 'GET_ALL_DOGS_SUCCEEDED';

export const getAllDogsSucceeded = (dogs) => {
  return { type: GET_ALL_DOGS_SUCCEEDED, payload: { dogs } };
};

export const getAllDogsFailed = (error) => {
  return { type: GET_ALL_DOGS_FAILED, payload: { error } };
};

export const getAllDogsAsync = (firebase) => {
  return (dispatch) => {
    dispatch(loadingStarted());

    return getAllDogs(firebase)
      .then((dogs) => {
        dispatch(getAllDogsSucceeded(dogs.val()));
        dispatch(subscribeToRatingsUpdates(firebase));
        dispatch(loadingEnded());
      })
      .catch((error) => {
        dispatch(getAllDogsFailed(error));
        dispatch(loadingEnded());
      });
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

export const getSpecificDogAsync = (firebase, id) => {
  return (dispatch) => {
    dispatch(loadingStarted());

    return getSpecificDog(firebase, id)
      .then((dog) => {
        dispatch(getSpecificDogSucceeded(dog.val()));
        dispatch(loadingEnded());
      })
      .catch((error) => {
        dispatch(getSpecificDogFailed(error));
        dispatch(loadingEnded());
      });
  };
};
