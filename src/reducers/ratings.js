import { GET_ALL_DOGS_SUCCEEDED } from '../actions/dogs';
import { UPDATE_RATING_SUCCEEDED } from '../actions/ratings';

const sortOrder = (foo, bar) => bar.rating - foo.rating;

const loading = (state = [], action) => {
  switch (action.type) {
  case GET_ALL_DOGS_SUCCEEDED:
    return action.payload.dogs.filter(x => x.rating).map(x => ({ id: x.id, rating: x.rating })).sort(sortOrder);
  case UPDATE_RATING_SUCCEEDED:
    return [
      {
        id: action.payload.dogId,
        rating: action.payload.rating,
      },
      ...state,
    ].sort(sortOrder);
  default:
    return state;
  }
};

export default loading;
