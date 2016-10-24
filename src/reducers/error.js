import {
  GET_ALL_DOGS_FAILED,
} from '../actions/dogs';

export default (state = {}, action) => {
  switch (action.type) {
  case GET_ALL_DOGS_FAILED:
    return action.payload.error;
  default:
    return state;
  }
};
