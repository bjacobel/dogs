import 'rxjs/add/operator/toPromise';

import Horizon from '@horizon/client';
import { HORIZON_AUTH } from '../constants';

export const getAllDogs = () => {
  const horizon = new Horizon(HORIZON_AUTH);
  return horizon('dogs').fetch().toPromise();
};

export const getSpecificDog = (id) => {
  const horizon = new Horizon(HORIZON_AUTH);
  return horizon('dogs').find({ id }).fetch().toPromise();
};
