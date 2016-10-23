import {
  loadingStarted,
  loadingEnded,
} from './loading';
import { getAllDogs } from '../services/rethink';

export const GET_ALL_DOGS_FAILED = 'GET_ALL_DOGS_FAILED';
export const GET_ALL_DOGS_SUCCEEDED = 'GET_ALL_DOGS_SUCCEEDED';

export const getAllDogsSucceeded = (title) => {
  return { type: GET_ALL_DOGS_SUCCEEDED, payload: { title } };
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
        dispatch(loadingEnded());
        dispatch(getAllDogsFailed(err));
      });
  };
};
