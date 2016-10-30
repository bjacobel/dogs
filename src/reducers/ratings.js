import { GET_ALL_DOGS_SUCCEEDED } from '../actions/dogs';
import { UPDATE_RATING_SUCCEEDED } from '../actions/ratings';

const sortOrder = (foo, bar) => bar.rating - foo.rating;

export default (state = [], action) => {
  let indexOfExistingDog;
  let stateTrimmedOfExistingDog;

  switch (action.type) {
  case GET_ALL_DOGS_SUCCEEDED:
    return action.payload.dogs.filter(x => x.rating).map(x => ({ id: x.id, rating: x.rating })).sort(sortOrder);
  case UPDATE_RATING_SUCCEEDED:
    indexOfExistingDog = state.findIndex(x => x.id === action.payload.dogId);

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
        id: action.payload.dogId,
        rating: action.payload.rating,
      },
      ...stateTrimmedOfExistingDog,
    ].sort(sortOrder);
  default:
    return state;
  }
};
