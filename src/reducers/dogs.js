import {
  GET_ALL_DOGS_SUCCEEDED,
} from '../actions/dogs';

export default (state = {}, action) => {
  switch (action.type) {
  case GET_ALL_DOGS_SUCCEEDED:
    return action.payload.dogs.reduce((accum, current) => Object.assign({}, accum, { [current.id]: current }), {});
  default:
    return state;
  }
};
