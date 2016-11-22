import { FB_CLIENT_CREATED } from '../actions/firebase';

export default (state = {}, action) => {
  switch (action.type) {
  case FB_CLIENT_CREATED:
    return action.payload;
  default:
    return state;
  }
};
