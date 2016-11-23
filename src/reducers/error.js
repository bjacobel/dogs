import {
  GET_ALL_DOGS_FAILED,
  GET_SPECIFIC_DOG_FAILED,
} from '../actions/dogs';

import { UPDATE_RATING_FAILED } from '../actions/ratings';

// @TODO: Show an error component and log to Sentry

export default (state = {}, action) => {
  switch (action.type) {
  case GET_ALL_DOGS_FAILED:
    console.error(action.payload.error);
    return action.payload.error;
  case GET_SPECIFIC_DOG_FAILED:
    console.error(action.payload.error);
    return action.payload.error;
  case UPDATE_RATING_FAILED:
    console.error(action.payload.error);
    return action.payload.error;
  default:
    return state;
  }
};
