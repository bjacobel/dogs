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

export const getAllDogsFailed = (err) => {
  return { type: GET_ALL_DOGS_FAILED, payload: { err } };
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
        console.error(err);
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

export const getSpecificDogFailed = (err) => {
  return { type: GET_SPECIFIC_DOG_FAILED, payload: { err } };
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
        console.error(err);
        dispatch(loadingEnded());
        dispatch(getSpecificDogFailed(err));
      });
  };
};
