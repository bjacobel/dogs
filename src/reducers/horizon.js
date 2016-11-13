import { HZ_CLIENT_CREATED } from '../actions/horizon';

export default (state = {}, action) => {
  switch (action.type) {
  case HZ_CLIENT_CREATED:
    return action.payload;
  default:
    return state;
  }
};
