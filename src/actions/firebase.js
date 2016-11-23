import { createClient } from '../services/firebase';

export const FB_CLIENT_CREATED = 'FB_CLIENT_CREATED';

export const createdFirebaseClient = (client) => {
  return { type: FB_CLIENT_CREATED, payload: client };
};

export const getOrCreateFirebaseClient = () => {
  return (dispatch, getState) => {
    const { firebase } = getState();

    if (firebase && Object.keys(firebase).length) {
      return firebase;
    } else {
      const client = createClient();
      dispatch(createdFirebaseClient(client));
      return client;
    }
  };
};
