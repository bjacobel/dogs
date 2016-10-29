import Horizon from '@horizon/client';
import { HORIZON_AUTH } from '../constants';

// @TODO: Init one Horizon, store it in state, use the same ws connection for all calls

export const getAllDogs = () => {
  const horizon = new Horizon(HORIZON_AUTH);
  return horizon('dogs').fetch();
};

export const getSpecificDog = (id) => {
  const horizon = new Horizon(HORIZON_AUTH);
  return horizon('dogs').find({ id }).fetch();
};

export const updateRating = (id, newRating) => {
  const horizon = new Horizon(HORIZON_AUTH);
  return horizon('dogs').update({ id, rating: newRating });
};
