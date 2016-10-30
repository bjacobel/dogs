import {
  GET_ALL_DOGS_SUCCEEDED,
  GET_SPECIFIC_DOG_SUCCEEDED,
} from '../actions/dogs';

import { UPDATE_RATING_SUCCEEDED } from '../actions/ratings';

export default (state = {}, action) => {
  switch (action.type) {
  case GET_ALL_DOGS_SUCCEEDED:
    return action.payload.dogs.reduce((accum, current) => {
      return Object.assign({}, accum, {
        [current.id]: current,
      });
    }, {});
  case GET_SPECIFIC_DOG_SUCCEEDED:
    return Object.assign({}, state, { [action.payload.dog.id]: action.payload.dog });
  case UPDATE_RATING_SUCCEEDED:
    return Object.assign({}, state, {
      [action.payload.dogId]: Object.assign({}, state[action.payload.dogId], { rating: action.payload.rating }),
    });
  default:
    return state;
  }
};
