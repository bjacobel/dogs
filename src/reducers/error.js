import {
  GET_ALL_DOGS_FAILED,
  GET_SPECIFIC_DOG_FAILED,
} from '../actions/dogs';

export default (state = {}, action) => {
  switch (action.type) {
  case GET_ALL_DOGS_FAILED:
    return action.payload.error;
  case GET_SPECIFIC_DOG_FAILED:
    return action.payload.error;
  default:
    return state;
  }
};
