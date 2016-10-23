import {
  GET_ALL_DOGS_SUCCEEDED,
} from '../actions/dogs';

export default (state = {}, action) => {
  switch (action.type) {
  case GET_ALL_DOGS_SUCCEEDED:
    return Object.assign({}, state, action.payload.dogs);
  default:
    return state;
  }
};
