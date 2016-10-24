import {
  GET_ALL_DOGS_SUCCEEDED,
  GET_SPECIFIC_DOG_SUCCEEDED,
} from '../actions/dogs';

export default (state = {}, action) => {
  switch (action.type) {
  case GET_ALL_DOGS_SUCCEEDED:
    return action.payload.dogs.reduce((accum, current) => Object.assign({}, accum, { [current.id]: current }), {});
  case GET_SPECIFIC_DOG_SUCCEEDED:
    return Object.assign({}, state, { [action.payload.dog.id]: action.payload.dog });
  default:
    return state;
  }
};
