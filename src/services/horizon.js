import Horizon from '@horizon/client';
import { HORIZON_AUTH } from '../constants';

// @TODO: Init one Horizon, store it in state, use the same ws connection for all calls

export const createClient = () => {
  const client = new Horizon(HORIZON_AUTH);
  return client('dogs');
};

export const getAllDogs = (horizon) => {
  return horizon.fetch();
};

export const getSpecificDog = (horizon, id) => {
  return horizon.find({ id }).fetch();
};

export const updateRating = (horizon, id, newRating) => {
  return horizon.update({ id, rating: newRating });
};
