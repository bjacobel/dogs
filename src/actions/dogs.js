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

    return getAllDogs()
      .then((dogs) => {
        dispatch(loadingEnded());
        dispatch(getAllDogsSucceeded(dogs));
      })
      .catch((err) => {
        dispatch(loadingEnded());
        dispatch(getAllDogsFailed(err));
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

export const getSpecificDogAsync = (id) => {
  return (dispatch) => {
    dispatch(loadingStarted());

    return getSpecificDog(id)
      .then((dog) => {
        dispatch(loadingEnded());
        dispatch(getSpecificDogSucceeded(dog));
      })
      .catch((err) => {
        dispatch(loadingEnded());
        dispatch(getSpecificDogFailed(err));
      });
  };
};
