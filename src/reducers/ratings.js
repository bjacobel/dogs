import { GET_ALL_DOGS_SUCCEEDED } from '../actions/dogs';
import { UPDATE_RATING_SUCCEEDED } from '../actions/ratings';

const sortOrder = (foo, bar) => {
  if (bar.rating !== foo.rating) {
    return bar.rating - foo.rating;
  } else {
    // sometimes the ratings are the same, so compare the IDs so that the standings are always deterministic
    return bar.id.localeCompare(foo.id);
  }
};

export default (state = [], action) => {
  let indexOfExistingDog;
  let stateTrimmedOfExistingDog;

  switch (action.type) {
  case GET_ALL_DOGS_SUCCEEDED:
    // @TODO: The iteration here could be much smarter, could do this with a single loop?
    return Object.values(action.payload.dogs)
      .filter(x => x.rating)
      .map(x => ({ id: x.id, rating: x.rating }))
      .sort(sortOrder);
  case UPDATE_RATING_SUCCEEDED:
    indexOfExistingDog = state.findIndex(x => x.id === action.payload.id);

    if (indexOfExistingDog >= 0) {
      stateTrimmedOfExistingDog = [
        ...state.slice(0, indexOfExistingDog),
        ...state.slice(indexOfExistingDog + 1, state.length),
      ];
    } else {
      stateTrimmedOfExistingDog = state;
    }

    return [
      {
        id: action.payload.id,
        rating: action.payload.rating,
      },
      ...stateTrimmedOfExistingDog,
    ].sort(sortOrder);
  default:
    return state;
  }
};
